import React, { useEffect, useState } from 'react'
import { PayButton, SectionWrapper } from '../../lib'
import { Link, useParams } from 'react-router-dom';
import urls from '../../services/urls';
import { Ordre, OrdreforPayment, Productqte } from "../../interface/interface.ts";


interface PaymentPageProps {
    onPaymentComplete: (status: 'success' | 'failed') => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ onPaymentComplete }) => {
    const { ordreid } = useParams<{ ordreid: string }>();
    const [ordre, setOrdre] = useState<Ordre>({});

    useEffect(() => {
        if (ordreid) {
            const getOrdre = async () => {
                try {
                    const response = await urls.getOrdreById(parseInt(ordreid));
                    setOrdre(response.data);
                } catch (error) {
                    console.error("Error fetching order:", error);
                }
            };
            getOrdre();
        }
    }, [ordreid]);


    const calculateSubtotal = (item: Productqte) => {
        const quantity = item.qte || 0; // Use 0 as a default if quantity is not defined
        const price = item.product?.price || 0; // Use 0 as a default if price is not defined
        return (quantity * price).toFixed(2); // Multiply and return the subtotal formatted to 2 decimal places
    };

    const total = () => {
        return ordre.amount;
    };


    const handlePurchaseComplete = async (order: OrdreforPayment) => {
        const ordreidNumber = Number(ordreid); 

        if (isNaN(ordreidNumber)) {
            console.error('Invalid order ID, not a number.');
            return;
        }

        order = {
            idOrdre: ordreidNumber,
            idUser: parseInt(ordre.user?.id),
            amount: ordre.amount,
            productqtes: ordre.productqtes,
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

    return (
        <>
            <div
                className="bg-gray-50 relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
                <div className="w-full max-w-6xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                    <div className="">
                        <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
                            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Checkout</h2>
                                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{ordre.productqtes?.length} Items</h2>
                            </div>
                            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                                <div className="col-span-12 md:col-span-7">
                                    <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                                </div>
                                <div className="col-span-12 md:col-span-5">
                                    <div className="grid grid-cols-5">
                                        <div className="col-span-3">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="font-normal text-lg leading-8 text-gray-400 text-center ml-24">Subtotal</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {ordre.productqtes?.map((item, index) => (
                                <div key={index} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                                    <div className="w-full md:max-w-[126px]">
                                        <img src={item.product?.image} alt="...." className="mx-auto rounded-xl" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                        <div className="md:col-span-2">
                                            <div className="flex flex-col max-[500px]:items-center gap-3">
                                                <h6 className="font-semibold text-base leading-7 text-black mb-8"> {item.product?.name} </h6>
                                                <h6 className="font-medium text-base mb-2 leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600"> ${item.product?.price} </h6>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center md:justify-end h-full max-md:mt-3">
                                            <div className="flex items-center justify-around w-24 h-8">
                                                <h1 className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" > X{item.qte} </h1>
                                            </div>
                                        </div>
                                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                            <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600"> ${calculateSubtotal(item)} </p>
                                        </div>
                                        <div>

                                        </div>

                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className='flex justify-center pb-20'>
                        <div className="flex items-center justify-between max-w-5xl w-full h-full p-6 bg-[#D9D9D9] border border-gray-200 rounded-lg shadow">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900">Order Total:</h5>
                            <h1 className="text-xl font-bold tracking-tight text-gray-900">${total()}</h1>
                        </div>
                    </div>
                    <div className='pb-44'>
                        <div>
                            <div className="mx-auto px-4 2xl:px-0">
                                <div className="mx-auto ">
                                    <div className="sm:mt-8 lg:flex lg:items-start lg:gap-12">
                                        <form action="#" className="w-full p-4 sm:p-6">
                                            <div className='flex justify-center items-center gap-8 '>
                                                <Link to={'/cart'} className="flex items-center justify-center rounded-md border border-black  px-10 py-2 text-sm font-medium text-black shadow-lg hover:bg-black hover:text-white">Go to Cart</Link>
                                                <PayButton
                                                    item={ordre}
                                                    handlePurchaseComplete={handlePurchaseComplete}
                                                />

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SectionWrapper(PaymentPage);



