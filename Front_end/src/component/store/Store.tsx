import React, { useEffect, useState } from 'react'
import { Loading, Pagination, SectionWrapper, useAuth, usePagination, useSold } from '../../lib'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddToStore from './AddToStore';
import StoreDetails from './StoreDetails';
import Transaction from './Transaction';
import urls from '../../services/urls';
import { Product } from "../../interface/interface.ts";
import Funds from './Funds';
import Vending from './Vending';



const parseDate = (dateStr) => {
  const [datePart, timePart] = dateStr.split(' '); // Split date and time
  const [day, month, year] = datePart.split('/'); // Split day, month, year
  const [hours, minutes] = timePart.split(':'); // Split hours and minutes

  // Create a valid Date object
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
};

const Store = () => {

  const [showDetails, setShowDetails] = useState('store');
  const [showPrice, setshowPrice] = useState(false);
  const [process, setProcess] = useState('')
  const [sellerId, setSellerId] = useState<string | undefined>(undefined);
  const [product, setProduct] = useState<Product[]>([]);
  const [productid, setProductid] = useState<number>(0);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { sold, setSold } = useSold();



  const { currentPage, paginatedData, setCurrentPage, pageSize } = usePagination(product);

  const getProducts = async () => {
    try {
      const response = await urls.getProductsBySeller(parseInt(sellerId || '0'));
      const sortedData = response.data.sort((a, b) => {
        const dateA = parseDate(a.daTe_creation); // Assuming your date field is named 'date'
        const dateB = parseDate(b.daTe_creation);
        return dateB.getTime() - dateA.getTime(); // Sort in descending order
      });

      setProduct(sortedData);
      setIsLoading(false);
    } catch (err) {
      console.log("faild to get data", err);
    }
  }

  useEffect(() => {
    if (user?.id && !isDataFetched) {
      const fetchUserData = async () => {
        try {
          const response = await urls.getSellerById(user.id)
          const userData = response.data;
          setSellerId(userData.id)
          setSold(userData.sold)
          setIsDataFetched(true);

        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      if (user?.id) {
        fetchUserData();
      }
    }
  }, [user?.id, user?.role, isDataFetched]);

  useEffect(() => {
    getProducts()
  }, [sellerId]);




  const handleButtonClick = (page) => {
    setShowDetails(page);
  };
  const handleButtonClick1 = (page: string, productid: number) => {
    setShowDetails(page);
    setProductid(productid);
  };

  function showPriceModel() {
    setshowPrice(!showPrice)
    setProcess('process')
  }

  useEffect(() => {
    if (showDetails === 'store') {
      setIsDataFetched(false);
      getProducts();
    }
  }, [showDetails, setIsDataFetched]);


  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {showDetails == 'store' ? (
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
          <div className="relative min-h-screen  grid">
            <div className="bg-slate-50 relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-slate-50">
              <div className="w-full max-w-6xl px-4 md:px-5 lg-6 mx-auto relative z-10">
                <div className="">
                  <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto mb-32">
                    <div className="flex items-center justify-between pb-8">
                      <h1 className="font-manrope font-bold text-3xl leading-10 text-cyan-600">Store:</h1>
                      <h1 className="font-manrope font-bold text-3xl leading-10 text-gray-600">Your balance: ${sold}</h1>
                    </div>
                    <div className="grid grid-cols-12 max-md:hidden pb-6 mt-16">
                      <div className="col-span-12 md:col-span-7">
                        <p className="font-normal text-lg leading-8 text-black">Product Details</p>
                      </div>
                      <div className="col-span-12 md:col-span-5">
                        <div className="grid grid-cols-5">
                          <div className="col-span-3">
                            <p className="font-normal text-lg leading-8 text-black text-center">Quantity</p>
                          </div>
                          <div className="col-span-2">

                          </div>
                        </div>
                      </div>
                    </div>
                    {paginatedData.map((item, index) => (
                      <div key={index}>
                        <div
                          className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-t border-black group">
                          <div className="w-full md:max-w-[126px]">
                            <img src={item.image} alt="..."
                              className="mx-auto rounded-xl" />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                            <div className="md:col-span-2">
                              <div className="flex flex-col max-[500px]:items-center gap-3">
                                <h6 className="font-semibold text-base leading-7 text-black mb-8"> {item.name} </h6>
                                <h6 className="font-medium text-base mb-2 leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600"> ${item.price} </h6>
                              </div>
                            </div>
                            <div className="flex items-center max-[500px]:justify-center md:justify-end h-full max-md:mt-3">
                              <div className="flex items-center justify-around w-24 h-8">
                                <h1 className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" > X{item.stock} </h1>
                              </div>
                            </div>
                            <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                              <button onClick={() => handleButtonClick1('storeDetails', item.idProduct!)} className="font-bold text-lg leading-8 text-gray-600 hover:text-black text-center">
                                <MoreHorizIcon />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {product.length > 10 && (
                      <Pagination<Product>
                        items={product}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                      />
                    )
                    }
                  </div>
                </div>
                <Funds setSold={setSold} sold={sold} showPrice={showPrice} togglePriceModel={showPriceModel} process={process} setProcess={setProcess} />
              </div>
            </div>
          </div>
        </>
      ) : showDetails === 'addTostore' ? (
        <div className='relative min-h-screen bg-slate-50'>
          <AddToStore setShowDetails={setShowDetails} />
        </div>
      ) : showDetails == 'storeDetails' ? (
        <div className='relative min-h-screen bg-slate-200'>
          <StoreDetails setShowDetails={setShowDetails} productid={productid} />
        </div>
      ) : showDetails == 'transaction' ? (
        <div className='relative min-h-screen grid bg-slate-200'>
          <Transaction setShowDetails={setShowDetails} />
        </div>
      ) : showDetails == 'vending' ? (
        <div className='relative min-h-screen grid bg-slate-200'>
          <Vending setShowDetails={setShowDetails} />
        </div>
      ) : null
      }
    </>
  )
}

export default SectionWrapper(Store)




