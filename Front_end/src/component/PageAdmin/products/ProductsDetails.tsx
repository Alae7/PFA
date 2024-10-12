import React, {useEffect, useState} from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import RateAd from '../../../lib/rate/RateAd';
import {Category, Product} from "../../../interface/interface.ts";

import urls from "../../../services/urls.ts";


const ProductsDetails = ({ setShowDetails, productid, onDeleteProduct }) => {
    const [categorys, setCategory] = useState<Category[]>([]);
    const [image, setImage] = useState<File | null>(null); 
    const [name, setName] = useState('');
    const [id, setid] = useState<number>(0);
    const [description, setdescriptionName] = useState('');
    const [price, setprice] = useState<number>(1);
    const [qte, setqte] = useState<number>(1);

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [product, setproduct] = useState<Product>();

    const getproducts = async () => {
        try {
            const resp = await urls.getOneProduct(productid);
            setproduct(resp.data);
        }catch (e){
            console.log("error getproducts",e);
        }
    }
    useEffect(() => {
        getproducts();
    }, [productid]);

    const getCategories = async () => {
        try {
            const response = await urls.getCategories();
            setCategory(response.data);
        } catch (error) {
            console.error("Failed to load data", error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);


    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handlesetdescriptionNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setdescriptionName(e.target.value);
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setprice(Number(e.target.value)); 
    };

    const handleQteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setqte(Number(e.target.value)); 
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleupdateProduct();
    };

    const handleupdateProduct = async () => {

        const formData = new FormData();
        const currentDate: Date = new Date();

        formData.append('productData', JSON.stringify({
            idcategory: id,
            name: name,
            stock: qte,
            description: description,
            price: price,
            daTe_creation: currentDate.toLocaleString()
        }));

        if (image) {
            formData.append('file', image);
        }

        try {
            await urls.updateProduct(productid,formData); 
            setName("");
            setImage(null);
            setprice(0);
            setqte(1);
            setid(0);
            setdescriptionName("");
            showUpdateModel(undefined)
            getproducts()
        } catch (error) {
            console.error("Failed to add category", error);
        }
    };

    function showDeleteModel() {
        setDeleteModalOpen(!deleteModalOpen)
    }
    function showUpdateModel(product: Product | undefined) {
        setUpdateModalOpen(!updateModalOpen)
        setdescriptionName(product?.description || "");
        setprice(product?.price || 0);
        setName(product?.name || "")
        setid(product?.idcategory || 0)
        setqte(product?.stock || 0)
    }

    const handledeleteproduct = async () => {
        try {
            await urls.deleteProduct(productid);
            setDeleteModalOpen(false)
            setShowDetails('main')
            onDeleteProduct(productid);
        }catch (e){
            console.log("error delete product",e);
        }

    }

    return (
        <>
            <div>
                <button onClick={() => setShowDetails('main')} className='text-cyan-700 mb-8'>
                    <ArrowBackIosNewIcon className='mb-2 h-3 w-3' /> <span className='font-bold text-2xl ml-1'>Back</span>
                </button>
            </div>
            <div className="flex flex-col items-center mt-10 w-full">
                <div className="w-full max-w-6xl p-5 mb-20">
                    <div className="flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 border border-gray-200 bg-white">
                        <div className="w-full md:w-1/4 bg-white grid place-items-center">
                            <img src={product?.image} alt="...." className="rounded-xl" />
                        </div>
                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">{product?.name}</h3>
                            <h5 className="">{product?.description}</h5>
                            <div className="pt-4">
                                <RateAd idproduct={product?.idProduct} />
                            </div>
                            <h5 className="pt-4 pb-4">Price: ${product?.price}</h5>
                            <div className="relative bottom-0  flex justify-around items-start w-full pt-4">
                                <button onClick={() => showUpdateModel(product)} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md px-7 py-2.5 text-center mb-2 w-5/12">
                                    Update
                                </button>
                                <button onClick={showDeleteModel} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-md px-7 py-2.5 text-center mb-2 w-5/12">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` z-20 w-full ${deleteModalOpen ? '' : 'hidden'}`}>
                    <div className="h-screen w-screen bg-black opacity-50 fixed top-0 left-0"></div>
                    <div id="deleteModal" tabIndex={-1} aria-hidden="true" className=" justify-center grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 md:h-full">
                        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
                                <button onClick={showDeleteModel} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="deleteModal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <svg className="text-gray-400 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                                <p className="mb-4 text-gray-500">Are you sure you want to delete this product?</p>
                                <div className="flex justify-center items-center space-x-4">
                                    <button onClick={showDeleteModel} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
                                        No, cancel
                                    </button>
                                    <button type="submit" onClick={() =>handledeleteproduct()}className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                                        Yes, I'm sure
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={` z-20 w-full ${updateModalOpen ? '' : 'hidden'}`}>
                    <div className="h-screen w-screen bg-black opacity-50 fixed top-0 left-0"></div>
                    <div id="defaultModalUpdate" tabIndex={-1}  className="scrollbar-none justify-center  grid content-center  fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-2xl max-h-screen">
                            <div className="w-[800px]  md:max-lg:w-[650px] max-[600px]:w-[300px] relative bg-white rounded-lg shadow">
                                <div className="flex items-start justify-between p-2 border-b rounded-t">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        Update Product
                                    </h3>
                                    <button onClick={() => showUpdateModel(product)} type="button" className="text-gray-400 bg-transparent hover:bg-rose-500  hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="relative px-5 z-0 w-full mb-1 group mt-2">
                                        <label htmlFor="name-input-Update" className="block text-sm font-medium text-gray-900 ">Name</label>
                                        <input name="name"  onChange={handleNameChange} value={name} placeholder="Write name..." type="text" id="name-input-Update" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </div>
                                    <div className="relative px-5 z-0 w-full mb-1 group">
                                        <label htmlFor="price-input-Update" className="block  text-sm font-medium text-gray-900 ">Price</label>
                                        <input name="price"  onChange={handlePriceChange} value={price} placeholder="Write your price here..." type="text" id="price-input-Update" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </div>
                                    <div className="relative px-5 z-0 w-full mb-1 group">
                                        <label htmlFor="quantity-input-Update" className="block  text-sm font-medium text-gray-900 ">Quantity</label>
                                        <input name="stock"  onChange={handleQteChange} value={qte} placeholder="Write your quantity here..." type="text" id="quantity-input-Update" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                                    </div>
                                    <div className="relative px-5 z-0 w-full mb-1 group">
                                        <label htmlFor="category-input-Update" className="block  text-sm font-medium text-gray-900 ">Category</label>
                                        <select onChange={(e) => setid(Number(e.target.value))} name='idcategory' value={id} id="category-input-Update" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                                            <option disabled value={0}>Choose a category</option>
                                            {
                                                categorys.map((item) => (
                                                    <option key={item.id} value={item.id}>{item.name} </option>
                                                ))}

                                        </select>
                                    </div>
                                    <div className="relative z-0 w-full px-5 mb-1 group">
                                        <label htmlFor="description-input-update" className="block  text-sm font-medium text-gray-900">Description</label>
                                        <textarea  name="description" value={description}
                                                          onChange={handlesetdescriptionNameChange} id="description-input-update" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none" placeholder="Write your thoughts here..."></textarea>
                                    </div>
                                    <div className="relative z-0 w-full px-5 mt-3 group">
                                        <label className="block mb-1 text-sm font-medium text-gray-900 " htmlFor="file_update_input">Upload Image</label>
                                        <input onChange={handleImageChange} name="image" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-slate-900 file:text-white file:border-0 file:me-4 file:py-2 file:px-2" aria-describedby="file_update_input" id="file_update_input" type="file" />
                                    </div>
                                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                                        <button data-modal-hide="defaultModalUpdate" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                                        <button onClick={() => showUpdateModel(product)} data-modal-hide="defaultModalUpdate" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Decline</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsDetails