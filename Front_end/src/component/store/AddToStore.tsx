import React, { useState } from 'react'
import { SellProduct, useSold } from '../../lib';
import Funds from './Funds';


const AddToStore = ({ setShowDetails }) => {

  const [showPrice, setshowPrice] = useState(false);
  const [process, setProcess] = useState('process');
  const { sold, setSold} = useSold();

  const handleButtonClick = (page) => {
    setShowDetails(page); 
  };

  function showPriceModel() {
    setshowPrice(!showPrice)
    setProcess('process')
  }
  


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
            <SellProduct />
            <Funds setSold={setSold} sold={sold} showPrice={showPrice} togglePriceModel={showPriceModel} process={process} setProcess={setProcess} />
        </>
    )
}
export default AddToStore