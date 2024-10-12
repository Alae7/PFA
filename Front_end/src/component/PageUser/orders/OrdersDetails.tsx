import React, { useEffect, useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { PayButton } from '../../../lib';
import { Ordre, OrdreforPayment, Status } from '../../../interface/interface.ts';
import urls from "../../../services/urls.ts"; 

const OrdersDetails = ({ setShowDetails, onPaymentComplete, ordreId }) => {
    const [ordreDetails, setOrdreDetails] = useState<Ordre>({});

    // Fetch the order details using the ordreId
    const getOrdreDetails = async () => {
        try {
            // Replace this with your API call to fetch order details
            const response = await urls.getOrdreById(ordreId);
            setOrdreDetails(response.data);
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };


    const handlePurchaseComplete = async (order: OrdreforPayment) => {
        const ordreidNumber = Number(ordreId);

        if (isNaN(ordreidNumber)) {
            console.error('Invalid order ID, not a number.');
            return;
        }

        order = {
            idOrdre: ordreidNumber,
            idUser: parseInt(ordreDetails.user?.id),
            amount: ordreDetails.amount,
            productqtes: ordreDetails.productqtes,
        };

        try {
            const { data } = await urls.buyProduct(order);
            if (data.success) {
                sessionStorage.setItem('paymentStatus', 'success');
                onPaymentComplete('success');
                window.location.href = `${data.redirectUrl}`;
            } else {
                onPaymentComplete('failed');
                window.location.href = `${data.redirectUrl}`;
            }
        } catch (error) {
            const { data } = await urls.buyProduct(order);
            console.error('Error:', error);
            onPaymentComplete('failed');
            window.location.href = `${data.redirectUrl}`;
        }
    };

    useEffect(() => {
        getOrdreDetails(); // Fetch order details when component mounts
    }, [ordreId]);


    return (
        <>
            <div>
                <button onClick={() => setShowDetails(false)} className='text-cyan-700 mb-8'>
                    <ArrowBackIosNewIcon className='mb-2 h-3 w-3' /> <span
                        className='font-bold text-2xl ml-1'>Back</span>
                </button>
            </div>
            {ordreDetails ? (
                <div className='overflow-auto sm:rounded-lg  ml-16'>
                    <h2 className='mb-2 ml-2 text-xl font-semibold'>Order {ordreDetails.idOrdre}</h2>
                    <h3 className='mb-2 ml-2 text-lg font-medium'><span
                        className='text-rose-700'>Total : </span> $ {ordreDetails.amount}</h3>
                    <h3 className='mb-2 ml-2 text-lg font-medium'><span
                        className='text-rose-700'>Created on : </span> {ordreDetails.date}</h3>
                    <h3 className='mb-2 ml-2 text-lg font-medium'><span
                        className='text-rose-700'>Status : </span> {ordreDetails.status}</h3>

                    <div className="col-span-12 xl:col-span-8 lg:pr-8 pb-8 lg:py-16 px-16 w-full max-xl:max-w-3xl max-xl:mx-auto">
                        <div className="grid grid-cols-12 max-md:hidden pb-6 border-b border-black">
                            <div className="col-span-12 md:col-span-7">
                                <p className="font-normal text-lg leading-8 text-black">Product Details</p>
                            </div>
                            <div className="col-span-12 md:col-span-5">
                                <div className="grid grid-cols-5">
                                    <div className="col-span-3">
                                        <p className="font-normal text-lg leading-8 text-black text-center">Quantity</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="font-normal text-lg leading-8 text-black text-center ml-24">Subtotal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Assuming ordreDetails has an array of products */}
                        {ordreDetails.productqtes?.map((product, index) => (
                            <div key={index}
                                className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-black group">
                                <div className="w-full md:max-w-[126px]">
                                    <img src={product.product?.image} alt="product" className="mx-auto rounded-xl" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                    <div className="md:col-span-2">
                                        <div className="flex flex-col max-[500px]:items-center gap-3">
                                            <h6 className="font-semibold text-base leading-7 text-black mb-8"> {product.product?.name} </h6>
                                            <h6 className="font-medium text-base mb-2 leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600"> $ {product.product?.price} </h6>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center max-[500px]:justify-center md:justify-end h-full max-md:mt-3">
                                        <div className="flex items-center justify-around w-24 h-8">
                                            <h1 className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700 outline-none"> X{product.qte} </h1>
                                        </div>
                                    </div>
                                    <div
                                        className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                        <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600"> $ {product.product?.price * product.qte} </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            ) : (
                <p>Loading order details...</p>
            )}
            {ordreDetails?.status === Status.LISTEN && (
                <div className='pb-44'>
                    <div>
                        <div className="mx-auto px-4 2xl:px-0">
                            <div className="mx-auto ">
                                <div className="sm:mt-8 lg:flex lg:items-start lg:gap-12">
                                    <form action="#" className="w-full p-4 sm:p-6">
                                        <div className='flex justify-center items-center gap-8 '>
                                            <PayButton
                                                item={ordreDetails}
                                                handlePurchaseComplete={handlePurchaseComplete}
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default OrdersDetails;
