import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import urls from "../../../services/urls.ts";
import { useEffect, useState } from "react";
import { Ordre } from "../../../interface/interface.ts";

interface OrdersDetailsProps {
    setShowDetails: (value: boolean) => void;
    ordreId: number | null;
}

const OrdersDetails: React.FC<OrdersDetailsProps> = ({ setShowDetails, ordreId }) => {
    const [ordreDetails, setOrdreDetails] = useState<Ordre>();

    const getOrdreDetails = async () => {
        try {
            if (ordreId) {
                const response = await urls.getOrdreById(ordreId);
                setOrdreDetails(response.data);
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    };

    useEffect(() => {
        getOrdreDetails();
    }, [ordreId]);

    if (!ordreDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div>
                <button onClick={() => setShowDetails(false)} className='text-cyan-700 mb-8'>
                    <ArrowBackIosNewIcon className='mb-2 h-3 w-3' /> <span className='font-bold text-2xl ml-1'>Back</span>
                </button>
            </div>
            <div className='overflow-auto sm:rounded-lg ml-16'>
                <div className='text-2xl font-semibold mb-4'>Order {ordreDetails.idOrdre}</div>
                <div className='mb-2 ml-2 text-lg font-medium'>
                    <span className='text-rose-700'>Name : </span> {ordreDetails.user?.fullName}
                </div>
                <div className='mb-2 ml-2 text-lg font-medium'>
                    <span className='text-rose-700'>Email : </span> {ordreDetails.user?.email}
                </div>
                <div className='mb-2 ml-2 text-lg font-medium'>
                    <span className='text-rose-700'>Total : </span> ${ordreDetails.amount}
                </div>
                <div className='mb-2 ml-2 text-lg font-medium'>
                    <span className='text-rose-700'>Created on : </span> {ordreDetails.date}
                </div>
                <div className='mb-2 ml-2 text-lg font-medium'>
                    <span className='text-rose-700'>Status : </span> {ordreDetails.status}
                </div>
            </div>

            <div className="">
                <div
                    className="col-span-12 xl:col-span-8 lg:pr-8 pb-8 mb-24 lg:py-16 px-16 w-full max-xl:max-w-3xl max-xl:mx-auto">
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

                    {ordreDetails.productqtes?.map((product, index) => (
                        <div key={index} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-black group">
                            <div className="w-full md:max-w-[126px]">
                                <img src={product.product?.image} alt="Product" className="mx-auto rounded-xl" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                                <div className="md:col-span-2">
                                    <div className="flex flex-col max-[500px]:items-center gap-3">
                                        <h6 className="font-semibold text-base leading-7 text-black mb-8"> {product.product?.name} </h6>
                                        <h6 className="font-medium text-base mb-2 leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                                            $ {product.product?.price}
                                        </h6>
                                    </div>
                                </div>
                                <div className="flex items-center max-[500px]:justify-center md:justify-end h-full max-md:mt-3">
                                    <div className="flex items-center justify-around w-24 h-8">
                                        <h1 className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black md:text-base cursor-default flex items-center text-gray-700 outline-none">
                                            X{product.qte}
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                                        {product?.product?.price && product?.qte ? product.product.price * product.qte : 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrdersDetails;
