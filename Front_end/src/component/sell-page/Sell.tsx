import React from 'react'
import { SectionWrapper } from '../../lib'
import { productExample, sell } from '../../assets';
import { Link } from 'react-router-dom';
import PepTalk from './PepTalk';

const Sell = () => {


    return (
        <>
            <header className='max-h-full'>
                <div className="bg-[#1E1B4B] flex px-6 py-16 text-surface max-w-full">
                    <div className='w-1/2 text-start'>
                        <h1 className="mb-6 text-5xl font-bold text-white">Start Selling With Us</h1>
                        <h3 className="ml-4 text-xl font-medium text-white">Showcase your products on our site and drive more sales.</h3>
                        <div className="flex items-center rounded-md">
                            <Link to="/startSell" className="text-[#A3E635] relative left-14 underline underline-offset-4 decoration-2 pb-6 text-lg font-medium">Be Seller Now</Link>
                            <img src={sell} alt="sell" />
                        </div>
                    </div>
                    <div className='text-end'>
                        <img src={productExample} alt="productExample" />
                    </div>
                </div>
            </header>
            <PepTalk />
        </>
    )
}

export default SectionWrapper(Sell);