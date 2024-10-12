import React, { useEffect, useState } from 'react';
import OrdersDetails from './OrdersDetails';
import { useAuth } from "../../../lib";
import { Ordre } from "../../../interface/interface.ts";
import urls from "../../../services/urls.ts";

const Orders = () => {
    const { user } = useAuth();
    const [ordres, setOrdres] = useState<Ordre[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedOrdreId, setSelectedOrdreId] = useState<number | null>(null);
    const [isPaymentComplete, setIsPaymentComplete] = useState(false);

    const handlePaymentCompletion = (status) => {
      if (status === 'success') {
        setIsPaymentComplete(true);
      } else {
        setIsPaymentComplete(false);
      }
    };

    const getOrdres = async () => {
        try {
            if (user?.id) { // Check if the user ID is available
                const response = await urls.getAllOrdres(parseInt(user.id));
                setOrdres(response.data); // Set the orders data
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    useEffect(() => {
        getOrdres(); // Fetch the orders data if the user ID is available
    }, [user?.id]);

    const handleButtonClick = (ordreId: number) => {
        setSelectedOrdreId(ordreId); // Set the selected order ID
        setShowDetails(true); // Show the order details component
    };

    return (
        <>
            {showDetails && selectedOrdreId ? (
                <div className='relative min-h-screen'>
                    {/* Pass the selectedOrdreId as a prop to OrdersDetails */}
                    <OrdersDetails setShowDetails={setShowDetails} onPaymentComplete ={handlePaymentCompletion}  ordreId={selectedOrdreId} />
                </div>
            ) : (
                <div className='relative min-h-screen'>
                    <div className='overflow-auto sm:rounded-lg ml-16'>
                        <h1 className='text-2xl font-semibold mb-4'>My Orders:</h1>
                        <div className='mt-10 grid grid-cols-1 gap-4'>
                            {ordres.length > 0 ? (
                                ordres.map((item) => (
                                    <div
                                        key={item.idOrdre}
                                        className='flex justify-between items-center border p-4 rounded-lg'
                                    >
                                        <div className='flex-grow'>
                                            <h2 className='mb-2 text-xl font-semibold'>Order {item.idOrdre}</h2>
                                            <h3 className='mb-2 text-lg font-medium'>
                                                <span className='text-rose-700'>Total :</span> $ {item.amount}
                                            </h3>
                                            <h3 className='mb-2 text-lg font-medium'>
                                                <span className='text-rose-700'>Created on : </span> {item.date}
                                            </h3>
                                            <h3 className='mb-2 text-lg font-medium'>
                                                <span className='text-rose-700'>Status : </span> {item.status}
                                            </h3>
                                        </div>
                                        <div className='flex items-center'>
                                            {/* Pass the ordreId to handleButtonClick */}
                                            <button
                                                onClick={() => handleButtonClick(item.idOrdre)}
                                                className='text-orange-600'
                                            >
                                                View order
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Orders;
