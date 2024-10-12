import React from 'react'
import { firstTalk } from '../../assets'

const PepTalk = () => {
    return (
        <>
            <div className='bg-gray-100 h-full'>
                <div className=" flex justify-center">
                    <div className="flex flex-col items-center md:flex-row md:max-w-4xl mb-44 mt-20">
                        <img className="object-cover w-1/2 h-full " src={firstTalk} alt="" />
                        <div className="flex items-start ml-6">
                            <div className="pl-4">
                                <div className='border-l-4 border-blue-500 '>
                                    <h2 className="text-2xl font-semibold ml-4">
                                        How You can start in this Business
                                    </h2>
                                </div>
                                <p className="text-gray-700 mt-2">
                                    Starting as a seller in our marketplace is easy! First, sign up by creating an account with your name, email, and contact information. After verifying your account via email, you can set up your store. Customize it by adding a logo, banner, and a brief description of your business to make it attractive to customers.
                                    Next, add the products you want to sell. Make sure to include clear descriptions, good photos, and accurate prices. Organize your products into the right categories so customers can find them easily. Keep an eye on your inventory to ensure you don't run out of stock. Our platform provides tools to help you manage your inventory efficiently.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PepTalk