import React, { useContext } from 'react';
import { minus, plus } from '../../assets';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import urls from "../../services/urls.ts";
import { useAuth } from "../authContext/AuthContext.tsx";
import { CartContext } from './CartContext.tsx';
import { Productqte } from '../../interface/interface.ts';

interface NavProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShopCart = ({ isOpen, onClose }: NavProps) => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, itemsCount } = useContext(CartContext) || {};
  const { user } = useAuth();
  // const [ids, setIds] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getCartId?.()
  // }, []);

  // useEffect(() => {
  //   if (ids !== undefined) {
  //     fetchCart?.(ids); // Assuming fetchCartItems is defined
  //   }
  // }, [ids]);

  const handleDecrease = (item: Productqte) => {
    // if (ids !== undefined) {
      decreaseQuantity?.(item); // No need to pass ids
    // }
  };

  const handleIncrease = (item: Productqte) => {
    // if (ids !== undefined) {
      increaseQuantity?.(item); // No need to pass ids
    // }
  };
  

  const handleRemove = (itemId: number) => {
    // if (ids !== undefined) {
      removeFromCart?.(itemId); // No need to pass ids
    // }
  };

  const calculateSubtotal = (item: Productqte) => {
    return ((item.qte ?? 0) * (item.product?.price ?? 0)).toFixed(2);
  };

  const total = () => {
    return cart?.amont || 0; // Corrected from amont to amount
  };

  const BuyNow = async () => {
    if (!user?.id) {
      console.error('User ID is not available');
      return; // Prevent execution if user ID is not available
    }
    if(cart?.productQteList?.length === 0) return;
    try {
      const response = await urls.addOrdre(parseInt(user.id));
      navigate(`/payment/${response.data}`);
    } catch (error) {
      console.error('Error adding to order:', error);
    }
  };


  return (
    <div className={`fixed top-0 right-0 h-screen z-50 ${isOpen ? '' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-xl">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                      Shopping cart <span className='text-red-400'>({itemsCount})</span>
                    </h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button onClick={onClose} type="button" className="relative -m-2 p-2 text-gray-500 hover:text-black">
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {cart?.productQteList?.map((item) => (
                          <li key={item?.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={item.product?.image} alt={item?.product?.name} className="h-full w-full object-contain object-center" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link to={`/product/${item.product?.idProduct}`}>{item.product?.name}</Link>
                                  </h3>
                                  <p className="ml-4">$ {calculateSubtotal(item)}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center justify-around border border-black rounded-md w-24 h-8">
                                  <button onClick={() => handleDecrease(item)} className="px-2 text-2xl hover:text-gray-700">
                                    <img src={minus} className='w-20' alt="Decrease" />
                                  </button>
                                  <input value={item.qte} onChange={() => {}}className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none" />
                                  <button onClick={() => handleIncrease(item)} className="px-2 text-2xl hover:text-gray-700">
                                    <img src={plus} className='w-20' alt="Increase" />
                                  </button>
                                </div>

                                <div className="flex">
                                  <button onClick={() => handleRemove(item.id || 0)} type="button" className="font-medium text-red-400 hover:text-red-500">
                                    <DeleteIcon />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {total()}</p>
                  </div>
                  <div className='flex justify-around items-center'>
                    <div className="mt-6 w-full">
                      <Link to={'/cart'} className="flex items-center justify-center rounded-md border border-black px-5 py-2 text-sm font-medium text-black shadow-lg hover:bg-black hover:text-white">Go to Cart</Link>
                    </div>
                    <div className="mt-6 ml-4 text-sm text-gray-500 w-full">
                      <button onClick={() => BuyNow()} type="button" className="font-medium bg-cyan-300 text-sm flex items-center justify-center rounded-md border border-black px-3 py-2 text-black shadow-lg hover:bg-cyan-500 hover:text-white">
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCart;
