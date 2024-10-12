import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Cart, Product, Productqte, ProductqteRequist } from '../../interface/interface';
import urls from '../../services/urls';
import { useAuth } from '../authContext/AuthContext';


interface CartContextType {
  cart: Cart;
  itemsCount: number;
  addToCart: (product1: Product) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  fetchCart: (cartId: number) => Promise<void>;
  increaseQuantity: (item: Productqte) => Promise<void>;
  decreaseQuantity: (item: Productqte) => Promise<void>;
  getCartId: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({});
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [ids, setIds] = useState<number | undefined>(undefined);
  const { user } = useAuth();

  // Modify the addToCart function to check if the product already exists in the cart
  const addToCart = async (product1: Product) => {
    try {
      if (ids !== undefined) {
        const stockAvailable = product1.stock || 0;
        console.log("Stock available for product:", stockAvailable);

        if (stockAvailable <= 0) {
          console.log("Cannot add product. Out of stock.");
          return; 
        }
          // If product does not exist, add it
          const productqte: ProductqteRequist = {
            idproduct: product1.idProduct,
            qte: 1,
          };
          console.log("Adding new product:", productqte);
          await urls.addProductToCart(ids, productqte);
          await fetchCart(ids);
  
      } else {
        console.error("Cart ID is not available");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const fetchCart = async (cartId: number) => {
    try {
      const response = await urls.getCart(cartId);

      if (response.data) {
        setCart(response.data);
        setItemsCount(response.data.productQteList?.length || 0);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };


  const getCartId = async () => {
    try {
      if (user?.id) {
        const response = await urls.getUserCart(parseInt(user.id));
        setIds(response.data); // Set the cart ID
      }
    } catch (error) {
      console.error('Error fetching cart ID:', error);
    }
  };


  useEffect(() => {
    if (user?.id) {
      getCartId(); // Fetch the cart ID if user ID is available
    }
  }, [user?.id]); // Depend on the user ID

  useEffect(() => {
    if (ids !== undefined) {
      fetchCart(ids); // Fetch the cart data if the cart ID is available
    }
  }, [ids]);

  const decreaseQuantity = async (item: Productqte) => {
    // Check if the quantity is greater than 1 before decreasing
    if ((item.qte || 0) > 1) {
      const updatedItem: Productqte = {
        ...item,
        qte: (item.qte || 0) - 1, // Decrease quantity by 1
      };

      try {
        await urls.updateProductqteofCart(ids, updatedItem);
        await fetchCart(ids); // Ensure you wait for fetchCart to complete
      } catch (error) {
        console.error('Error updating item quantity in cart:', error);
      }
    } else {
      // Optionally, handle case when trying to decrease quantity below 1
      console.log('Quantity cannot be less than 1');
    }
  };

  const increaseQuantity = async (item: Productqte) => {
    const currentQuantity = item.qte || 0; // Current cart quantity
    const stockAvailable = item.product?.stock || 0; // Available stock
    // Ensure the new quantity does not exceed stock
    if (stockAvailable > 0) {
      const updatedItem: Productqte = {
        ...item,
        qte: currentQuantity + 1, // Increase quantity by 1
      };

      try {
        await urls.updateProductqteofCart(ids, updatedItem);
        await fetchCart(ids);
      } catch (error) {
        console.error("Error updating item quantity in cart:", error);
      }
    } else {
      console.log("Cannot increase quantity. Reached stock limit.");
    }
  };


  const removeFromCart = async (itemId: number) => {
    try {
      await urls.deleteProductFromCart(ids, itemId);
      await fetchCart(ids); // Ensure you wait for fetchCart to complete
      // Update itemsCount after removing from cart
      // setItemsCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, itemsCount, addToCart, removeFromCart, fetchCart, increaseQuantity, decreaseQuantity, getCartId }}>
      {children}
    </CartContext.Provider>
  );
};
