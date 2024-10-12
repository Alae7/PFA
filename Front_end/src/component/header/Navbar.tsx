import React from 'react'
import { Link } from "react-router-dom";
import { menu, accountMenu } from '../../constants'
import LogoutIcon from '@mui/icons-material/Logout';
import {  useAuth } from '../../lib';


interface NavProps {
    isOpen: boolean;
    onClose: () => void;
}

const Navbar = ({ isOpen, onClose }: NavProps) => {
    const { user, logout } = useAuth();
    const userRole = user?.role;


    return (
        <>
            <nav className={`fixed top-0 left-0 h-screen w-64 bg-primary z-20 transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} >
                <div className="p-5 w-64 h-full z-20 fixed top-0 lg:left-0 lg:w-60 peer-focus:left-0 ">
                    <div className="flex flex-col justify-start item-center">
                        <div className=''>
                            <button onClick={onClose} className="absolute my-icon top-3 right-4 inline-flex items-center peer justify-center rounded-md p-1 mt-2 text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black group" >
                                <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 42V28M8 20V6M24 42V24M24 16V6M40 42V32M40 24V6M2 28H14M18 16H30M34 32H46" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <h1 className="text-3xl font-semibold text-white border-b border-gray-100 w-full pb-3">VENETEX</h1>
                        </div>
                        <div className=" mt-8 ">
                        <h1 className='text-white text-xl font-semibold w-full mb-4'>MarketPlace</h1>
                            {menu
                            ?.filter(item => userRole === "seller" || item.role === "user")
                            .map((item, i) => {
                                return (
                                    <div key={i} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl mb-4 pl-10 hover:bg-white hover:text-black p-1 pt-2 rounded-md hover:shadow-lg " >
                                        <Link to={item?.href} className="text-base font-semibold w-full" >
                                            {item.icon} <span className='pl-3'> {item.titre} </span>
                                        </Link>
                                    </div>
                                )
                            })}
                            <h1 className='text-white text-xl font-semibold w-full mb-4 mt-8'>Account</h1>
                            {accountMenu
                            ?.filter(item => {
                                if (userRole === "admin") return item.role === "admin"; 
                                return item.role === "user";
                            })
                            .map((item1, j) => {

                                return (
                                    <div key={j} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl mb-4 pl-10 hover:bg-white hover:text-black p-1 pt-2 rounded-md hover:shadow-lg " >
                                        <Link to={item1?.href} className="text-base font-semibold w-full" >
                                            {item1.icon} <span className='pl-3'> {item1.titre} </span>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="grid justify-items-stretch ">
                            <Link onClick={logout} to="/" className="w-11/12 bg-gradient-to-r from-[#FDFCFB] to-[#E2D1C3] fron-bg-gradient ml-8 mt-14 border border-gray-700 p-1 pt-2 rounded-lg hover:bg-gradient-to-l hover:from-red-500 hover:to-red-600 hover:shadow-lg m-auto group cursor-pointer">
                                <h2 className="text-base text-black group-hover:text-white font-semi-bold w-full">
                                    <LogoutIcon className='ml-2 mb-1 h-5 w-5' /> <span className='pl-4'>Logout</span>
                                </h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar