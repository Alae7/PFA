import React, { useEffect, useState } from 'react'
import { Category } from "../../interface/interface.ts";
import urls from "../../services/urls.ts";
import { useAuth } from '../authContext/AuthContext.tsx';
import Toastify, { LoadingNotify, Notify } from '../toastify/Toastify.tsx';

const SellProduct = () => {
  const [categorys, setCategory] = useState<Category[]>([]);
  const [image, setImage] = useState<File>();
  const [name, setName] = useState('');
  const [id, setid] = useState<number>(0);
  const [description, setdescriptionName] = useState('');
  const [price, setprice] = useState<number>(1);
  const [qte, setqte] = useState<number>(1);
  const {user} = useAuth();

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

  const handlesetdescriptionNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdescriptionName(e.target.value);
  };

  const handlepriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprice(e.target.value);
  };

  const handleqteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setqte(e.target.value);
  };


  const handleAddProduct = async () => {

    // Create a new FormData object
    const formData = new FormData();
    const currentDate: Date = new Date();

    // Append the categoryData as a JSON string
    formData.append('productData', JSON.stringify({
      idcategory: id,
      idseller: user?.id,
      name: name,
      stock: qte,
      description: description,
      price: price,
      daTe_creation: currentDate.toLocaleString()
    }));

    // Append the image file, if provided
    if (image) {
      formData.append('file', image);
    }

    try {
      await LoadingNotify(
        urls.addProduct(formData),
        "Loading information...",  
        "Product added successfully!",  
        "Failed to add product."  
    );
      setName("");
      setImage(null);
      setprice(0);
      setqte(1);
      setid(0);
      setdescriptionName("")
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };


  return (
    <>
      <div className='flex flex-col mt-16'>
        <div className="flex flex-col items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-10/12 h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-zinc-100">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="Preview" className="h-full w-full object-fill rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            )}
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
        <div className='overflow-auto sm:rounded-lg  ml-28 mt-10 mb-20'>
          <div className="grid gap-6 mb-6 max-w-5xl md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
              <input type="text" id="price" value={price} onChange={handlepriceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
              <input type="text" id="quantity" value={qte} onChange={handleqteChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
              <select
                value={id}
                onChange={(e) => setid(Number(e.target.value))}
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              >
                <option disabled value={0}>Choose a category</option>
                {categorys.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>

          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
            <textarea id="description" value={description} onChange={handlesetdescriptionNameChange} rows={5}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5"
              required />
          </div>
          <button type="submit" onClick={() => handleAddProduct()}
            className="relative start-3/4 text-white bg-[#052E16] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base w-full sm:w-auto px-14 py-2.5 mb-8 text-center">Submit</button>
        </div>
      </div>
      <Toastify />
    </>
  )
}

export default SellProduct