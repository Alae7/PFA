import React, { createContext, useState, useEffect, useContext } from "react";
import { User } from "../../interface/interface";
import urls from "../../services/urls";



// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (user: User) => Promise<void>;
  signup: (user: User) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  updateUser: (updatedUserData: Partial<User>) => void;
}

// Create the AuthContext with undefined as default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to manage authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State to hold the user object, initialized from local storage
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State to indicate loading status
  const [loading, setLoading] = useState(true);

  // Function to handle user login
  const login = async (user: User) => {
    try {
      const response = await urls.login(user);
      const { token, id, fullName, email, role } = response.data;

      // If the response contains valid user data, save it to local storage and update state
      if (token && fullName && role) {
        const userData = { id, fullName, email, role };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // Function to handle user signup
  const signup = async (user: User) => {
    try {
      const response = await urls.Register(user);
      const { token, id, fullName, email, role } = response.data;
      
      // If the response contains valid user data, save it to local storage and update state
      if (token && fullName && role) {
        const userData = { id, fullName, email, role };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Signup failed", error);
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
  };

  // Function to check the user's authentication status
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const storedUser = JSON.parse(localStorage.getItem("user") || '{}');
        // If the user data is present, update state accordingly
        if (storedUser && Object.keys(storedUser).length > 0) {
          setUser(storedUser);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  // Function to update user data
  const updateUser = (updatedUserData: Partial<User>): void => {
    if (!user) return;

    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Check authentication status on component mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout, checkAuth, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
