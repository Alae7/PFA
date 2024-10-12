import React, { useState } from 'react'
import { SectionWrapper, useAuth } from '../../lib'
import { Seller } from '../../interface/interface';
import urls from '../../services/urls';
import { useNavigate } from 'react-router-dom';

const StartSell = () => {

    const [isSended, setIsSended] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState<Seller>({ businessName: '', businessEmail: '', businessAddress: '', paypalEmail: '' });
    const { user, logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleClick = () => {
        if (!isLoggedIn) {
            setIsModalOpen(!isModalOpen);
            return
        }
        setIsSended(!isSended);
    };

    async function addSeller(addFormData: Seller) {
        urls.userToSeller(user?.id, addFormData).then(response => {
            console.log(response.data);
        })
            .catch(e => {
                console.log(e);
            });

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addSeller(formData);
        setFormData({ businessName: '', businessEmail: '', businessAddress: '', paypalEmail: '' });
        logout();
        navigate("/login")
    };


    return (
        <>
            <div className='h-full mt-8 ml-12'>
                <div className='flex flex-col  items-center h-screen'>
                    <h1 className='text-2xl font-semibold mb-8'>Send demand to us to be  a seller:</h1>
                    <button onClick={handleClick} type="button" className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-base px-8 py-2.5 me-2 mb-2">Send</button>
                    <div className="error-message p-4 mt-4 text-sm rounded-lg bg-red-800 text-slate-300" role="alert">
                        <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                        <span className="sr-only">Info</span>
                        Warning you log out after be seller
                    </div>
                </div>
                <div className={` z-20 w-full ${isSended ? '' : 'hidden'}`}>
                    <div className="h-screen w-screen bg-black opacity-50 fixed top-0 left-0"></div>
                    <div id="emailModal" tabIndex={-1} aria-hidden="true" className="flex justify-center content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 md:h-full">
                        <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
                            <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                                <button onClick={handleClick} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="emailModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <h1 className="font-bold text-xl leading-10 text-black mt-4">Enter the following information:</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="input_businessName" className="block mb-2 font-medium text-gray-900">Business Name:</label>
                                        <input type="text" id="input_businessName" name='businessName' value={formData.businessName || ''} onChange={handleChange} className="border border-gray-400 text-gray-900 text-base rounded-lg w-full block px-5 py-2" placeholder="Enter your business name" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="input_businessEmail" className="block mb-2 font-medium text-gray-900">Business Email:</label>
                                        <input type="email" id="input_businessEmail" name='businessEmail' value={formData.businessEmail || ''} onChange={handleChange} className="border border-gray-400 text-gray-900 text-base rounded-lg w-full block px-5 py-2" placeholder="Enter your business email" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="input_businessAddress" className="block mb-2 font-medium text-gray-900">Business Address:</label>
                                        <input type="text" id="input_businessAddress" name='businessAddress' value={formData.businessAddress || ''} onChange={handleChange} className="border border-gray-400 text-gray-900 text-base rounded-lg w-full block px-5 py-2" placeholder="Enter your business address" required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="input_paypalEmail" className="block mb-2 font-medium text-gray-900">Email Paypal:</label>
                                        <input type="email" id="input_paypalEmail" name='paypalEmail' value={formData.paypalEmail || ''} onChange={handleChange} className="border border-gray-400 text-gray-900 text-base rounded-lg w-full block px-5 py-2" placeholder="Enter your paypal email" required />
                                    </div>
                                    <div className="flex justify-center items-center space-x-4">
                                        <button type="submit" className="text-black border border-black text-base font-semibold hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow- shadow-slate-800/50  rounded-lg px-8 py-2 text-center me-2 mb-2">submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${isModalOpen ? '' : 'hidden'} absolute  z-20`} >
                    <div className="h-screen w-screen bg-black opacity-80 fixed top-0 right-0"></div>
                    <div id="deleteModal" aria-hidden="true" className=" justify-center  grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 h-modal md:h-full">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                            <div className="relative p-4 text-center  rounded-lg shadow bg-white sm:p-5">
                                <button onClick={handleClick} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-white" data-modal-toggle="deleteModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <svg className="mx-auto mb-4  w-12 h-12 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <p className="mb-4 w-80 text-zinc-900">You need to login first</p>
                                <div className="flex justify-center items-center space-x-4">
                                    <button onClick={handleClick} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-white text-gray-800 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
                                        No, cancel
                                    </button>
                                    <button onClick={() => navigate(`/login`)} type="submit" className="text-white bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 shadow-lg shadow-teal-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-5 py-2 text-center me-2">
                                        Go to login page
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SectionWrapper(StartSell);