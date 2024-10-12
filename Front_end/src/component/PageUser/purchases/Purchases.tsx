import React, { useEffect, useState } from 'react';
import { ClientPayment } from "../../../interface/interface.ts";
import { useAuth } from "../../../lib";
import urls from "../../../services/urls.ts";
import OrdersDetails from './OrdersDetails';

const Purchases = () => {
    const [purchasesList, setPurchasesList] = useState<ClientPayment[]>([]);
    const { user } = useAuth();
    const [ordreid, setOrdres] = useState<number>(0);
    const [showDetails, setShowDetails] = useState(false);

    const getPurchases = async () => {
        try {
            const response = await urls.getpurshas(parseInt(user?.id));
            setPurchasesList(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (user?.id) {
            getPurchases();
        }
    }, [user?.id]);

    const handleButtonClick = (ordreId: number) => {
        setOrdres(ordreId); // Set the selected order ID
        setShowDetails(true); // Show the order details component
    };

    return (
        <>
            {showDetails && ordreid ? (
                <div className='relative min-h-screen'>
                    {/* Pass the selectedOrdreId as a prop to OrdersDetails */}
                    <OrdersDetails setShowDetails={setShowDetails}  ordreId={ordreid} />
                </div>
            ) : (
            <div className="relative min-h-screen">
                <div className="overflow-auto sm:rounded-lg ml-16">
                    <h1 className="font-semibold text-3xl">Purchased Products</h1>
                </div>
                <div className="relative min-h-screen p-5 m-5 grid">
                    <div className="overflow-auto sm:rounded-lg mr-8 ml-16">
                        <table className="w-full text-sm text-left text-gray-800 md:max-lg:w-[769px] max-[600px]:w-[769px]">
                            <thead className="text-xs text-black uppercase bg-cyan-500">
                            <tr>
                                <th scope="col" className="px-6 py-3">Payment ID</th>
                                <th scope="col" className="px-6 py-3">Date</th>
                                <th scope="col" className="px-6 py-3">Amount</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Payment Method</th>
                                <th scope="col" className="px-6 py-3">Order</th>
                            </tr>
                            </thead>
                            <tbody>
                            {purchasesList.length > 0 ? (
                                purchasesList.map((item) => (
                                    <tr key={item.idPayment} className="bg-white border-b">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                            {item.idPayment}
                                        </th>
                                        <td className="px-6 py-4">{item.date_Payment}</td>
                                        <td className="px-6 py-4">${item.amount_Payment}</td>
                                        <td className={`px-6 py-4 font-semibold ${item.status === "successful" ? "text-green-700" : "text-red-500"}`}>
                                            {item.status}
                                        </td>
                                        <td className="px-6 py-4">{item.payment_methode}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleButtonClick(item.idOrder)}
                                                className="text-orange-600">
                                                View order
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-4">No Purchases found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            )}
        </>
    );
};

export default Purchases;
