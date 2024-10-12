import React, { useContext, useEffect, useState } from "react";
import { ScrollTop, RateAd, useAuth, CartContext } from "../../lib";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../interface/interface.ts";
import urls from "../../services/urls.ts";

interface ShopPageProps {
  products: Product[];
}

const ShopPage: React.FC<ShopPageProps> = ({ products }) => {
  const { user } = useAuth();
  const { addToCart, fetchCart } = useContext(CartContext) || {};
  const [cartId, setCartId] = useState<number>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const getcartid = async () => {
    try {
      if (user?.id) {
        const userId = parseInt(user.id); // Ensure it's parsed to an integer
        const response = await urls.getUserCart(userId);
        setCartId(response.data);
      }
    } catch (error) {
      console.error("Error getting cart id:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      getcartid(); // Fetch cart ID when user ID changes
    }
  }, [user?.id]);

  useEffect(() => {
    if (cartId) {
      fetchCart?.(cartId); // Fetch cart items when cartId is available
    }
  }, [cartId, fetchCart]);

  const handleAddToCart = async (product: Product) => {
    if (!cartId) {
      console.error("Cart ID is undefined, cannot add to cart");
      return;
    }
    await addToCart?.(product);
  };

  const BuyNow = async (product: Product) => {
    if (user?.id) {
      const userId = parseInt(user.id);
      await handleAddToCart(product); // Add the product to the cart
      const response = await urls.addOrdre(userId); // Assuming you have a method to add order
      navigate(`/payment/${response.data}`);
    }
  };

  function showModel() {
    setIsModalOpen(!isModalOpen);
  }


  return (
    <div className="flex">
      <div className="h-screen"></div>
      <div>
        <h1 className="text-2xl font-semibold m-8">Products you may want</h1>
        <div className="mb-40">
          {products.length > 0 ? (
            products.map((item) => (
              <div key={item.idProduct} className="flex flex-col mb-4">
                <div className="relative ml-10 flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-lg md:max-w-3xl mx-auto border border-white bg-white">
                  <Link to={`/shop/${item.idProduct}`} className="w-full md:w-4/6 bg-white grid place-items-center">
                    <img
                      src={item.image}
                      alt={item.image}
                      className="rounded-xl"
                    />
                  </Link>
                  <div className="w-full md:w-screen bg-white flex flex-col space-y-2 p-3">
                    <Link to={`/shop/${item.idProduct}`} className="font-black text-gray-800 md:text-3xl text-xl">
                      {item.name}
                    </Link>
                    <div className="pt-4">
                      <RateAd idproduct={item.idProduct} />
                    </div>
                    <Link to={`/shop/${item.idProduct}`} className="pt-4 pb-4">
                      Price: ${item.price}
                    </Link>
                    <div className="flex justify-around items-start w-full pt-4">
                      {isLoggedIn ? (
                        <>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="text-black bg-[#86EFAC] hover:bg-[#6cd693] font-medium rounded-2xl w-full text-base py-1.5 me-2 mb-2 text-center"
                          >
                            Add to cart
                          </button>
                          <button
                            onClick={() => BuyNow(item)}
                            className="text-black bg-[#38BDF8] hover:bg-[#34b4eb] font-medium rounded-2xl w-full text-base py-1.5 me-2 mb-2 text-center"
                          >
                            Buy Now
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={showModel}
                            className="text-black bg-[#86EFAC] hover:bg-[#6cd693] font-medium rounded-2xl w-full text-base py-1.5 me-2 mb-2 text-center"
                          >
                            Add to cart
                          </button>
                          <button
                            onClick={showModel}
                            className="text-black bg-[#38BDF8] hover:bg-[#34b4eb] font-medium rounded-2xl w-full text-base py-1.5 me-2 mb-2 text-center"
                          >
                            Buy Now
                          </button>
                          <div className={`${isModalOpen ? '' : 'hidden'} absolute  z-20`} >
                            <div className="h-screen w-screen bg-black opacity-80 fixed top-0 right-0"></div>
                            <div id="deleteModal" aria-hidden="true" className=" justify-center  grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 h-modal md:h-full">
                              <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                                <div className="relative p-4 text-center  rounded-lg shadow bg-white sm:p-5">
                                  <button onClick={showModel} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-white" data-modal-toggle="deleteModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                  </button>
                                  <svg className="mx-auto mb-4  w-12 h-12 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>
                                  <p className="mb-4 w-80 text-zinc-900">You need to login first</p>
                                  <div className="flex justify-center items-center space-x-4">
                                    <button onClick={showModel} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-white text-gray-800 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
                                      No, cancel
                                    </button>
                                    <button onClick={() => navigate(`/login`)} type="submit" className="text-white bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2 text-center me-2">
                                      Go to login page
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-2xl font-medium ml-12 text-blue-950">
              Nothing yet
            </h1>
          )}
        </div>
      </div>
      <ScrollTop />
    </div>
  );
};

export default ShopPage;