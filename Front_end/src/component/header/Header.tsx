import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { navLinks } from '../../constants';
import SearchBar from '../../lib/search-bar/SearchBar';
import {  CartContext, ShopCart, useAuth, useSearchContext } from '../../lib';
import { logo1, profileImage, } from '../../assets';
// import {Cart} from "../../interface/interface.ts";
import urls from "../../services/urls.ts";


const Header: React.FC = () => {
    const { handleSearch } = useSearchContext();
    const { isLoggedIn, checkAuth, user, logout } = useAuth();
    const [active, setActive] = useState('');
    const location = useLocation();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    // const [cart, setCart] = useState<Cart>();
    const { itemsCount } = useContext(CartContext) || {};

    const getcart = async () =>{
        if (!user?.id) {
            console.error('User ID is not available');
            return; 
          }
        try {
            const response = await urls.getUserCart(parseInt(user?.id));
            await urls.getCart(response.data)
            // setCart(reponse1.data);
        }catch(error){
            console.error("Error fetching cart:", error);
        }
    }




    useEffect(() => {
        checkAuth();
        const currentPath = location.pathname;
        const currentNav = navLinks.find((nav) => nav.href === currentPath);
        if (currentNav) {
            setActive(currentNav.title);
        }
    }, [location]);

    const openNav = () => {
        setIsNavOpen(true);
    };

    const closeNav = () => {
        setIsNavOpen(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
        getcart();
    }, [user?.id]);
    return (
        <>
            <header className="border-gray-200 bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-1">
                    <div className='flex flex-wrap justify-between items-center space-x-24'>
                        <div>
                            <Link to="/" className="flex items-center w-full">
                                <img src={logo1} alt="logo" className='w-48 h-20 object-center object-cover' />
                            </Link>
                        </div>
                        <div className='flex items-center space-x-12'>
                            {navLinks.map((nav) => (
                                <Link key={nav.id} to={nav.href} className={`${active === nav.title ? "text-white" : "text-gray-400"} hover:text-white text-[18px] font-medium cursor-pointer`}
                                > {nav.title}</Link>
                            ))
                            }
                        </div>
                    </div>
                    {isLoggedIn ? (
                        <div>
                            <div className="flex w-full flex-wrap items-center justify-between px-3">

                                <div className="relative flex items-center justify-center gap-2">
                                    <div className="relative" >
                                        <button onClick={toggleCart} className="me-4 flex items-center text-secondary-500 transition duration-200 hover:text-secondary-600/70 hover:ease-in-out focus:text-secondary-600/70 active:text-secondary-600/70 motion-reduce:transition-none text-secondary-500 hover:text-secondary-500/80 focus:text-secondary-500/80 active:text-secondary-500/80">
                                            <span>
                                                <svg width="44" height="30" viewBox="0 0 44 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M29.6154 26.3933V24.2667H9.73077L11 22.14L30.4615 20.4L33.8462 8.8H7.82692L6.34615 3H0V4.93333H4.65385L9.09615 21.1733L6.34615 26.2V29.1C6.34615 30.6467 7.82692 32 9.51923 32C11.2115 32 12.6923 30.6467 12.6923 29.1C12.6923 27.5533 11.2115 26.2 9.51923 26.2H25.3846V29.1C25.3846 30.6467 26.8654 32 28.5577 32C30.25 32 31.7308 30.6467 31.7308 29.1C31.7308 27.7467 30.8846 26.78 29.6154 26.3933ZM8.46154 10.7333H31.0962L28.7692 18.4667L11 20.2067L8.46154 10.7333Z" fill="#F5F5F5" />
                                                </svg>
                                            </span>
                                            <span className="absolute -mt-4 ms-7 rounded-full bg-red-500 px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white">{itemsCount}</span>
                                        </button>
                                    </div>
                                    <div className="flex w-full flex-wrap items-center justify-between px-3">
                                        <div className="relative ms-3" data-twe-dropdown-ref>
                                            <button onClick={() => {
                                                    setToggle(!toggle);
                                                }} className="flex items-center whitespace-nowrap transition duration-200 hover:ease-in-out motion-reduce:transition-none text-white/60 hover:text-white/80 focus:text-white/80 active:text-white/80" >
                                                <img
                                                    src={profileImage}
                                                    className="rounded-full w-14 h-14"
                                                    alt="Avatar"
                                                    loading="lazy" />
                                                <div className='flex flex-col items-start'>
                                                    <h1 className='text-white text-base ml-4'> {user?.fullName} </h1>
                                                    <p className='text-gray-400 text-sm ml-4'> {user?.role} </p>
                                                </div>
                                                <span className="ps-1 [&>svg]:w-5 text-white">
                                                    <svg className={`transform transition-transform duration-200 mb-4 ${toggle ? 'rotate-180' : 'rotate-0'}`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                            clipRule="evenodd" />
                                                    </svg>
                                                </span>

                                            </button>
                                            <ul
                                                className={`${!toggle ? "hidden" : ""
                                                    } bg-black absolute left-0 right-auto z-[1000] float-left m-0  min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-clip-padding text-left text-base shadow-lg data-[twe-dropdown-show]:block bg-surface-dark`} >
                                                <li>
                                                    <Link to={'/profile'} className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal focus:outline-none active:no-underline bg-surface-dark text-white hover:bg-neutral-800 focus:bg-neutral-800 active:bg-neutral-800" >
                                                        My profile</Link>
                                                </li>
                                                <li>
                                                    <Link onClick={logout} to="/" className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal focus:outline-none active:no-underline bg-surface-dark text-white hover:bg-neutral-800 focus:bg-neutral-800 active:bg-neutral-800" >
                                                        Logout</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button type="button" className="text-black shadow-2xl border-1 border-black w-40 bg-yellow-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                <p className="text-sm hover:underline">Sign in</p>
                            </button>
                        </Link>
                    )
                    }
                </div>
            </header>
            <header className="bg-gray-700">
                <div className="max-w-screen-xl px-1 py-3 mx-auto">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <button onClick={openNav} className="my-icon top-3 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-white hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black group">
                            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 42V28M8 20V6M24 42V24M24 16V6M40 42V32M40 24V6M2 28H14M18 16H30M34 32H46" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
            </header>
            <Navbar isOpen={isNavOpen} onClose={closeNav} />
            <ShopCart isOpen={isCartOpen} onClose={toggleCart} />
        </>
    )
}

export default Header
