import React, { useContext, useState } from 'react'
import { CartContext, SectionWrapper, useAuth } from '../../lib'
import { minus, plus } from '../../assets';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate, } from 'react-router-dom';
import urls from "../../services/urls.ts";
import { Productqte } from "../../interface/interface.ts";

const CartComponent = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, itemsCount } = useContext(CartContext) || {};
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleDecrease = (item: Productqte) => {
        // if (ids !== undefined) {
        decreaseQuantity?.(item);
        // }
    };

    const handleIncrease = (item: Productqte) => {
        // if (ids !== undefined) {
        increaseQuantity?.(item);
        // }
    };



    const handleRemove = (itemId: number) => {
        // if (ids !== undefined) {
        removeFromCart?.(itemId);
        // }
    };


    const calculateSubtotal = (item: Productqte) => {
        const quantity = item.qte || 0;
        const price = item.product?.price || 0;
        return (quantity * price).toFixed(2);
    };

    const total = () => {
        return cart?.amont;
    };


    const BuyNow = async () => {
        try {
            if (!user?.id || !isLoggedIn) {
                setIsModalOpen(!isModalOpen);
                return;
            }
            if (cart?.productQteList?.length === 0) return;
            const response = await urls.addOrdre(parseInt(user?.id));
            // setOrdreid(response.data);
            navigate(`/payment/${response.data}`);
        } catch (error) {
            console.error("Error adding to ordre:", error);
        }
    };


    return (
        <>
            <div className="bg-gray-50 relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="grid grid-cols-12">
                        <div
                            className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Cart</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{itemsCount} Items</h2>
                            </div>
                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center mr-24">Quantity</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center mr-24">Subtotal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {cart?.productQteList?.map((item) => (
                                <div key={item.id}
                                    className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                                    <div className="w-full md:max-w-[126px]">
                                        <img src={item.product?.image} alt="...."
                                            className="mx-auto rounded-xl h-24" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                        <div className="md:col-span-2">
                                            <div className="flex flex-col max-[500px]:items-center gap-3">
                                                <h6 className="font-semibold text-base leading-7 text-black mb-2"> {item.product?.name} </h6>
                                                <h6 className="font-medium text-base mb-2 leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">$ {item.product?.price} </h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                                            <div className="flex items-center justify-around border border-black rounded-md w-24 h-8">
                                                <button
                                                    onClick={() => handleDecrease(item)}
                                                    className="px-2 text-2xl hover:text-gray-700" >
                                                    <img src={minus} className='w-20' />
                                                </button>
                                                <input value={item.qte} onChange={() => { }} className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" ></input>
                                                <button
                                                    onClick={() => handleIncrease(item)}
                                                    className="px-2 text-2xl hover:text-gray-700" >
                                                    <img src={plus} className='w-20' />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600"> ${calculateSubtotal(item)} </p>
                                            <button onClick={() => handleRemove(item.id!)} type="button" className='ml-12 text-red-400 hover:text-red-600' >
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                        <div>

                                        </div>

                                    </div>
                                </div>
                            ))
                            }

                        </div>
                        <div
                            className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white">${total()}</dd>
                                            </dl>

                                            <dl className="flex items-center justify-between gap-4">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Delivery Charge</dt>
                                                <dd className="text-base font-medium text-red-400">$0</dd>
                                            </dl>

                                        </div>

                                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                                            <dd className="text-base font-bold text-gray-900 dark:text-white">${total()}</dd>
                                        </dl>
                                    </div>
                                    <div></div>
                                    <button onClick={() => BuyNow()} className="w-full rounded-lg bg-[#4F46E5] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#3e37c2]  shadow-[0_8px_30px_rgb(0,0,0,0.12)]">Proceed to Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-center bg-gray-50 pb-20 '>
                <div className="grid justify-items-stretch max-w-4xl w-full h-full p-6 bg-[#CCFBF1] border border-gray-200 rounded-lg shadow">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Continue shopping</h5>
                        <p className="font-normal ml-2 text-gray-700 ">Discover more of our product.</p>
                    </div>
                    <div className='justify-self-end'>
                        <Link to={'/shop'} className="text-white text-base bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg px-8 py-2.5 text-center me-2 mb-2">Continue Shopping</Link>
                    </div>
                </div>
            </div>

            <div className={`${isModalOpen ? '' : 'hidden'} absolute  z-20`} >
                <div className="h-screen w-screen bg-black opacity-80 fixed top-0 right-0"></div>
                <div id="deleteModal" aria-hidden="true" className=" justify-center  grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 h-modal md:h-full">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                        <div className="relative p-4 text-center  rounded-lg shadow bg-white sm:p-5">
                            <button onClick={BuyNow} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-white" data-modal-toggle="deleteModal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <svg className="mx-auto mb-4  w-12 h-12 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <p className="mb-4 w-80 text-zinc-900">You need to login first</p>
                            <div className="flex justify-center items-center space-x-4">
                                <button onClick={BuyNow} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-white text-gray-800 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
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

export default SectionWrapper(CartComponent);



