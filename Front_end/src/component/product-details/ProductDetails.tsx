import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ScrollTop, SectionWrapper, CarouselProduct, RateAd, useAuth } from '../../lib';
import { minus, plus } from '../../assets';
import Reviews from '../reviews-Product/Reviews';
import { Product, ProductqteRequist } from '../../interface/interface';
import urls from '../../services/urls';

const ProductDetails = () => {
    const [quantity, setQuantity] = useState<number>(1);
    const { id } = useParams(); // 'id' is of type string (from URL)
    const [idcart, setCartIds] = useState<number | null>(null);
    const { user, isLoggedIn } = useAuth();
    const [product, setProduct] = useState<Product | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const [ordreid, setOrdreid] = useState<number | null>(null);

    // Fetch the cart ID for the authenticated user
    const getCartId = async () => {
        try {
            if (user) {
                const response = await urls.getUserCart(parseInt(user.id));
                setCartIds(response.data);
            }
        } catch (error) {
            console.error("Error getting cart ID:", error);
        }
    };

    // Fetch the product details based on the product ID from the URL
    const fetchProduct = async () => {
        try {
            if (id) {
                const response = await urls.getOneProduct(id);
                setProduct(response.data);
                setLoading(false);
            }
        } catch (error) {
            console.error("Error fetching product ID:", id, error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) {
            getCartId();
        }
    }, [user?.id]);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Handlers for quantity changes
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQty = Number(e.target.value);
        if (updatedQty >= 1) {
            setQuantity(updatedQty);
        }
    };

    // Add the product to the cart
    const handleAddToCart = async (product1: Product | null) => {
        if (product1 && idcart !== null) {
            const productqte: ProductqteRequist = {
                idproduct: product1.idProduct,
                qte: quantity,
            };
            try {
                await urls.addProductToCart(idcart, productqte);
                console.log('Added to cart:', product1);
                getCartId(); // Update cart after adding
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        }
    };

    // Handle buying the product immediately
    const buyNow = async (product1: Product) => {
        if (user) {
            const currentDate = new Date();
            const ordreRequest = {
                idUser: user.id,
                Ordre_date: currentDate.toLocaleString(),
            };
            try {
                await handleAddToCart(product1); // Add to cart before buying
                const response = await urls.addOrdre(ordreRequest);
                navigate(`/payment/${response.data}`);
            } catch (error) {
                console.error("Error adding to order:", error);
            }
        } else {
            console.error("User not authenticated");
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    function showModel() {
        setIsModalOpen(!isModalOpen);
    }


    return (
        <>
            <div className="flex flex-col items-center mt-10 w-full">
                <div className="w-full max-w-6xl p-5 mb-20">
                    <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 border border-gray-200 bg-white">
                        <div className="w-full md:w-1/4 bg-white grid place-items-center">
                            <img src={product?.image} alt={product?.name} className="rounded-xl" />
                        </div>
                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3 break-words">
                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">{product?.name}</h3>
                            <h5 className="">{product?.description}.</h5>
                            <div className="pt-4">
                                <RateAd idproduct={product?.idProduct} />
                            </div>
                            <h5 className="pt-4 pb-4">Price: ${product?.price}</h5>
                            <div className="flex items-center justify-around border border-black rounded-md w-24 h-8">
                                <button
                                    onClick={decreaseQuantity}
                                    className="px-2 text-2xl hover:text-gray-700" >
                                    <img src={minus} className='w-20' />
                                </button>
                                <input min="1" onChange={enterQty} className="focus:outline-none text-center w-full font-semibold text-md hover:text-black focus:text-black  md:text-base cursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={quantity} ></input>
                                <button
                                    onClick={increaseQuantity}
                                    className="px-2 text-2xl hover:text-gray-700"

                                >
                                    <img src={plus} className='w-20' />
                                </button>
                            </div>
                            <div className="flex justify-around items-start w-full pt-4">
                                {isLoggedIn ? (
                                    <>
                                        <button onClick={() => handleAddToCart(product)} className="text-black bg-[#86EFAC] hover:bg-[#6cd693] font-medium rounded-2xl w-5/12 text-base py-1.5 mx-2 mb-2 text-center">
                                            Add to cart
                                        </button>
                                        <button onClick={() => product && buyNow(product)} className="text-black bg-[#38BDF8] hover:bg-[#34b4eb]  font-medium rounded-2xl w-5/12 text-base py-1.5 mx-2 mb-2 text-center">
                                            Buy Now
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={showModel} className="text-black bg-[#86EFAC] hover:bg-[#6cd693] font-medium rounded-2xl w-5/12 text-base py-1.5 mx-2 mb-2 text-center">
                                            Add to cart
                                        </button>
                                        <button onClick={showModel} className="text-black bg-[#38BDF8] hover:bg-[#34b4eb]  font-medium rounded-2xl w-5/12 text-base py-1.5 mx-2 mb-2 text-center">
                                            Buy Now
                                        </button>
                                        <div className={`${isModalOpen ? '' : 'hidden'} absolute  z-20`} >
                                            <div className="h-screen w-screen bg-black opacity-80 fixed top-0 right-0"></div>
                                            <div id="deleteModal" aria-hidden="true" className=" justify-center  grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 h-modal md:h-full">
                                                <div className="relative p-4 w-full max-w-md h-full md:h-auto">

                                                    <div className="relative p-4 text-center  rounded-lg shadow bg-white sm:p-5">
                                                        <button onClick={showModel} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-red-500 hover:text-white" data-modal-toggle="deleteModal">
                                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                        <svg className="mx-auto mb-4  w-12 h-12 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        <p className="mb-4 w-80 text-zinc-900">You need to login first</p>
                                                        <div className="flex justify-center items-center space-x-4">
                                                            <button onClick={showModel} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium rounded-lg border focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10 bg-white text-gray-800 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600">
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
                                    </>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <ScrollTop />
            </div >
            <div>
                <CarouselProduct currentCategory={product?.idcategory} />
            </div>
            <div>
                <Reviews idproduct={product?.idProduct} />
            </div>
        </>
    );
};

export default SectionWrapper(ProductDetails);
