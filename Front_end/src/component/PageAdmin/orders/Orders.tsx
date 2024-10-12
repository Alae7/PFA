import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OrdersDetails from './OrdersDetails';
import { Ordre } from "../../../interface/interface.ts";
import urls from "../../../services/urls.ts";
import { Pagination, usePagination } from '../../../lib/index.ts';



  // Helper function to parse date strings in the format 'dd/mm/yyyy hh:mm'
  const parseDate = (dateStr) => {
    const [datePart, timePart] = dateStr.split(' '); // Split date and time
    const [day, month, year] = datePart.split('/'); // Split day, month, year
    const [hours, minutes] = timePart.split(':'); // Split hours and minutes

    // Create a valid Date object
    return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
  };

  
const Orders = () => {

  const [ordres, setOrdrs] = useState<Ordre[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrdreId, setSelectedOrdreId] = useState<number | null>(null);
  const [items, setItems] = useState<Ordre[]>([]);
  const [searchText, setSearchText] = useState('');
  const { currentPage, paginatedData, setCurrentPage, pageSize } = usePagination(ordres);



  const getOrdres = async () => {

    try {
      const response = await urls.getAllOrdresadmin();
      const sortedData = response.data.sort((a, b) => {
        const dateA = parseDate(a.date); // Assuming your date field is named 'date'
        const dateB = parseDate(b.date);
        return dateB.getTime() - dateA.getTime(); // Sort in descending order
      });
      setOrdrs(sortedData);
      setItems(sortedData);
    } catch (err) {
      console.log("faild to get data", err);
    }

  }

  useEffect(() => {
    getOrdres()
  }, []);



  const handleButtonClick = (ordreId: number | undefined) => {
    setSelectedOrdreId(ordreId !== undefined ? ordreId : null);
    setShowDetails(true);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value.trim() === '') {
      setOrdrs(items);
    } else {
      const filteredOrder = items.filter((order) =>
        (order.user?.email && order.user?.email.toLowerCase().includes(value)) ||
        (order.user?.fullName && order.user?.fullName.toLowerCase().includes(value))
      );
      setOrdrs(filteredOrder);
    }
  };



  return (
    <>
      {showDetails ? (
        <div className='relative min-h-screen '>
          <OrdersDetails setShowDetails={setShowDetails} ordreId={selectedOrdreId} />
        </div>
      ) : (
        <div className="relative min-h-screen  grid">
          <div className=" overflow-auto sm:rounded-lg   ml-16">
            <div className='flex  justify-between'>
              <div className='relative w-full max-w-96 mt-3 mb-5'>
                <h1 className='font-semibold text-3xl'>Orders</h1>
              </div>
              <div className="relative w-full max-w-96 mt-3 mb-5">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                </div>
                <input type="text" id="simple-search" value={searchText} onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="Search" required />
              </div>
            </div>
            {paginatedData.length > 0 ? (
              <>
                <table className="w-full text-sm text-left text-gray-800  md:max-lg:w-[769px] max-[600px]:w-[769px]">
                  <thead className="text-xs text-black uppercase bg-green-300 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        order_Id
                      </th>
                      <th scope="col" className="px-6 py-3">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item) => (
                      <tr key={item.idOrdre} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                          {item.user?.fullName}
                        </th>
                        <td className="px-6 py-4">
                          {item.user?.email}
                        </td>
                        <td className="px-6 py-4">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          $ {item.amount}
                        </td>
                        <td className="px-6 py-4">
                          {item.status}
                        </td>
                        <td className="px-6 py-4">
                          {item.idOrdre}
                        </td>
                        <td className="px-6 py-4 text-black">
                          <button onClick={() => handleButtonClick(item.idOrdre)}>
                            <MoreHorizIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                    }
                  </tbody>
                </table>
                {ordres.length > 10 && (
                <Pagination<Ordre>
                  items={ordres}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
                )}
              </>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Orders