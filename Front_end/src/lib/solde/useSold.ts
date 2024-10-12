import { useEffect, useState } from 'react';
import urls from '../../services/urls';
import { useAuth } from '..';

const useSold = () => {
    const [sold, setSold] = useState();
    const { user } = useAuth();
    const [isDataFetched, setIsDataFetched] = useState(false);


    useEffect(() => {
        if (user?.id && !isDataFetched) {
          const fetchUserData = async () => {
            try {
              const response = await urls.getSellerById(user.id)
              const userData = response.data;
              setSold(userData.sold)
              setIsDataFetched(true);
    
            } catch (error) {
              console.error('Error fetching user data:', error);
            }
          };
    
          if (user?.id) {
            fetchUserData();
          }
        }
      }, [user?.id, user?.role, isDataFetched]);

  return {
    sold,
    setSold,
  };
};

export default useSold;