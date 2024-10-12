import React, { useEffect, useMemo, useState } from 'react'
import Funds from './Funds';
import urls from '../../services/urls';
import { Pagination, useAuth, usePagination, useSold } from '../../lib';
import { StatusVente, Vente } from '../../interface/interface';


const Vending = ({ setShowDetails }) => {

    const [showPrice, setshowPrice] = useState(false);
    const [process, setProcess] = useState('process');
    const [showStatus, setSowStatus] = useState('pending')
    const [data, setData] = useState<Vente[]>([]);
    const { user } = useAuth();
    const [items, setItems] = useState<Vente[]>([]);
    const [searchText, setSearchText] = useState('');
    const { sold, setSold} = useSold();


    const reversedData = useMemo(() => {
        return [...data].reverse();
    }, [data]);

    const filteredData = useMemo(() => {
        return reversedData.filter(item => item.status === (showStatus === 'pending' ? StatusVente.pending : StatusVente.delivred));
    }, [reversedData, showStatus]);

    const { currentPage, paginatedData, setCurrentPage, pageSize } = usePagination(filteredData);



    const handleButtonClick = (page) => {
        setShowDetails(page);
    };
    const handleStatus = (status) => {
        setSowStatus(status)
        setCurrentPage(1)
    }

    function showPriceModel() {
        setshowPrice(!showPrice)
        setProcess('process')
    }

    const handleDeliverProduct = async (vente) => {
        try {
            const response = await urls.productDelivred(vente);
            console.log('Product delivered successfully:', response.data);

            // Update the local state without re-fetching
            setData((prevData) =>
                prevData.map((item) =>
                    item.id === vente.id ? { ...item, status: StatusVente.delivred } : item
                )
            );
        } catch (error) {
            console.error('Error delivering product:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await urls.getVenteByIdSeller(user?.id)
                const data = await response.data
                setData(data);
                setItems(data)
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        fetchData();
    }, [user?.id]);


    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchText(value);

        if (value.trim() === '') {
            setData(items);
        } else {
            const filteredVente = items.filter((user) =>
                (user.product_name && user.product_name.toLowerCase().includes(value)) ||
                (user.nom_user && user.nom_user.toLowerCase().includes(value))
            );
            setData(filteredVente);
        }
    };



    return (
        <>
            <header className="border-gray-200 bg-zinc-300">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
                    <div className='flex flex-wrap justify-between items-center space-x-24 text-gray-800'>
                        <button onClick={() => handleButtonClick('store')} className="font-manrope font-bold text-xl leading-10 ">Store</button>
                        <button onClick={() => handleButtonClick('addTostore')} className="font-manrope font-bold text-xl leading-10">Add Product</button>
                        <button onClick={() => handleButtonClick('transaction')} className="font-manrope font-bold text-xl leading-10 ">Transaction</button>
                        <button onClick={() => handleButtonClick('vending')} className="font-manrope font-bold text-xl leading-10">Vending</button>
                        <button onClick={showPriceModel} className="font-manrope font-bold text-xl leading-10">Funds</button>
                    </div>
                </div>
            </header>
            <div className='relative min-h-screen  grid'>
                <div className="overflow-auto sm:rounded-lg mr-8  ml-16">
                    <div className='flex justify-around mt-12 mb-16'>
                        <div className='flex items-start w-full max-w-96 space-x-4'>
                            <button type="button" onClick={() => handleStatus('pending')} className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-red-500/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2">Pending</button>
                            <button type="button" onClick={() => handleStatus('delivred')} className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:outline-none shadow-lg shadow-green-500/50  font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mb-2">delivred</button>
                        </div>
                        <div className="relative w-full max-w-96 ">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 mb-1 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" id="simple-search" value={searchText} onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="Search" required />
                        </div>
                    </div>
                    {showStatus == 'pending' ? (
                        <>
                            <table className="w-full text-sm text-left text-gray-800  md:max-lg:w-[769px] max-[600px]:w-[769px]">
                                <thead className="text-xs text-black uppercase bg-cyan-500 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            nom
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            phone
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            country
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            adresse
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            product
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            qte
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                {paginatedData.filter(item1 => item1.status === StatusVente.pending)
                                    .map((item, index) => (
                                        <tbody key={index}>
                                            <tr className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                    {item.nom_user}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                    {item.phone_user}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                    {item.country_user}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.adresse_user}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.product_name}
                                                </td>
                                                <td className="px-6 py-4 font-semibold">
                                                    {item.price}
                                                </td>
                                                <td className="px-6 py-4 font-semibold">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 font-semibold">
                                                    <button onClick={() => handleDeliverProduct(item)} className="bg-red-400 px-2 py-1 rounded-md font-semibold text-amber-200">
                                                        {item.status}
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                }
                            </table>
                            <Pagination<Vente>
                                items={filteredData}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    ) : showStatus == 'delivred' ? (
                        <>
                            <table className="w-full text-sm text-left text-gray-800  md:max-lg:w-[769px] max-[600px]:w-[769px]">
                                <thead className="text-xs text-black uppercase bg-cyan-500 ">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            nom
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            phone
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            country
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            adresse
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            product
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            qte
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                {paginatedData.filter(item => item.status === StatusVente.delivred)
                                    .map((item, index) => (
                                        <tbody key={index}>
                                            <tr className="bg-white border-b">
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                    {item.nom_user}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                    {item.phone_user}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                    {item.country_user}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {item.adresse_user}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {item.product_name}
                                                </td>
                                                <td className="px-6 py-4 font-semibold">
                                                    {item.price}
                                                </td>
                                                <td className="px-6 py-4 font-semibold">
                                                    {item.quantity}
                                                </td>
                                                <td className="px-6 py-4 font-semibold">
                                                    <button className="bg-teal-700 px-2 py-1 rounded-md font-semibold text-emerald-100">
                                                        {item.status}
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))
                                }
                            </table>
                            <Pagination<Vente>
                                items={filteredData}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </>

                    ) : null

                    }
                </div>
            </div>
            <Funds setSold={setSold} sold={sold} showPrice={showPrice} togglePriceModel={showPriceModel} process={process} setProcess={setProcess} />
        </>
    )
}

export default Vending