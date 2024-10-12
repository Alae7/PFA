import { useEffect, useState } from 'react';
import { Category } from "../../../interface/interface.ts";
import urls from "../../../services/urls.ts";
import { LoadingNotify, Toastify } from '../../../lib/index.ts';

const Categorycomponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categorys, setCategory] = useState<Category[]>();
  const [name, setName] = useState('');
  const [name1, setName1] = useState('');
  const [advertising, setAdvertising] = useState('');
  const [advertising1, setAdvertising1] = useState('');
  const [image, setImage] = useState<File>();
  const [image1, setImage1] = useState<File>();
  const [categoryid, setidcategory] = useState<number>();

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAdvertisingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvertising(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create a new FormData object
    const formData = new FormData();

    // Append the categoryData as a JSON string
    formData.append('categoryData', JSON.stringify({
      name: name,
      pub: advertising
    }));

    // Append the image file, if provided
    if (image) {
      formData.append('file', image);
    }

    try {
      await LoadingNotify(
        urls.addCategory(formData),
        "Loading category...",  
        "Category added successfully!",  
        "Failed to add category."  
    );
      getCategories(); // Refresh categories after adding
      // Clear the form inputs
      setName('');
      setAdvertising('');
      setImage(null);
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };
  const handleNameChangeupdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName1(e.target.value);
  };

  const handleAdvertisingChangeupdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdvertising1(e.target.value);
  };

  const handleImageChangeupdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage1(e.target.files[0]);
    }
  };

  function showModel() {
    setModalOpen(!modalOpen);
  }
  function showModel2(id : number) {
    setidcategory(id);
    setModalOpen(!modalOpen);
  }

  function showDeleteModel() {
    setDeleteModalOpen(!deleteModalOpen);
    setModalOpen(false);
  }

  const handledeletecategory = async () => {
    try {
      await urls.deleteCategory(categoryid);
      getCategories();
      setDeleteModalOpen(!deleteModalOpen);
    }catch (e){
      console.log("error delete product",e);
    }

  }

  const handleupdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Create a new FormData object
    const formData = new FormData();

    // Append the categoryData as a JSON string
    formData.append('categoryData', JSON.stringify({
      name: name1,
      pub: advertising1
    }));

    // Append the image file, if provided
    if (image1) {
      formData.append('file', image1);
    }

    try {
      await urls.updateCategory(categoryid ,formData); // Send the FormData with both file and data
      getCategories(); // Refresh categories after adding
      // Clear the form inputs
      setName1('');
      setAdvertising1('');
      setImage1(null);
      showModel();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };


  return (
      <>
       <div className="relative min-h-screen grid">
          <div className="overflow-auto sm:rounded-lg ml-16">
            <h1 className='font-semibold text-3xl'>Categories</h1>
            <form onSubmit={handleAddCategory}>
              <div className="mb-6 mt-8 w-3/4 ml-8">
                <label htmlFor="name_input" className="block mb-2 text-xl font-medium text-gray-900">Name</label>
                <input
                    type="text"
                    id="name_input"
                    className="bg-[#A7F3D0] border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3"
                    placeholder="Write category name"
                    value={name}
                    onChange={handleNameChange}
                    required
                />
                <label htmlFor="Advertising_input" className="block mb-2 text-xl font-medium text-gray-900 mt-4">Advertising phrase</label>
                <input
                    type="text"
                    id="Advertising_input"
                    className="bg-[#A7F3D0] border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-3"
                    placeholder="Write advertising phrase"
                    value={advertising}
                    onChange={handleAdvertisingChange}
                    required
                />
                <label className="block mb-2 text-xl font-medium text-gray-900 mt-4" htmlFor="file_update_input">Upload Image</label>
                <input
                    name="file_update_input"
                    className="block w-full text-base text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-slate-900 file:text-white file:border-0 file:me-4 file:py-3 file:px-4"
                    id="file_update_input"
                    type="file"
                    onChange={handleImageChange}
                    required
                />
              </div>
              <button
                  type="submit"
                  className="relative start-2/3 text-white bg-[#0E7490] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-14 py-2.5 mb-8 text-center"
              >
                Submit
              </button>
            </form>

            <div className='border-b border-black w-full'></div>

            <div className='mt-8 mb-8'>
              {categorys?.map((item) => (
                  <button onClick={() => showModel2(item.id)} key={item.id} type="button" className="text-black shadow-md bg-[#93C5FD] hover:bg-sky-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2">
                    {item.name}
                  </button>
              ))}
            </div>
          </div>
          <div className={` z-20 w-full ${modalOpen ? '' : 'hidden'}`}>
            <div className="h-screen w-screen bg-black opacity-50 fixed top-0 left-0"></div>
            <div id="modal" tabIndex={-1} aria-hidden="true" className="flex justify-center content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 md:h-full">
              <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
                <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                  <button onClick={showModel} type="button"
                          className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                          data-modal-toggle="modal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <form onSubmit={handleupdateCategory}>
                    <div className="mb-8 mt-8">
                      <label htmlFor="input_name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                      <input type="text" onChange={handleNameChangeupdate} id="input_name"
                             className="bg-[#FFEDD5] border border-gray-300 text-gray-900 text-base rounded-lg w-full block px-5 py-2"
                             placeholder="name" required/>
                      <label htmlFor="input_Advertising" className="block mb-2 mt-4 text-sm font-medium text-gray-900">Advertising
                        phrase</label>
                      <input type="text" onChange={handleAdvertisingChangeupdate} id="input_Advertising"
                             className="bg-[#FFEDD5] border border-gray-300 text-gray-900 text-base rounded-lg w-full block px-5 py-2"
                             placeholder="advertising phrase" required/>
                      <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 " htmlFor="file_update_input">Upload
                        Image</label>
                      <input onChange={handleImageChangeupdate} name="file_update_input"
                             className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:bg-slate-900 file:text-white file:border-0 file:me-4 file:py-2 file:px-2"
                             aria-describedby="file_update_input" id="file_update_input" type="file"/>
                    </div>
                    <div className="flex justify-center items-center space-x-4">
                      <button  data-modal-toggle="modal" type="submit"
                              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center mb-2">
                        Update
                      </button>
                      <button onClick={showDeleteModel} type="submit"
                              className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-7 py-2.5 text-center mb-2">
                        Delete
                      </button>
                    </div>
                  </form>
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
                  <p className="mb-4 text-gray-500">Are you sure you want to delete this Category?</p>
                  <div className="flex justify-center items-center space-x-4">
                    <button onClick={showDeleteModel} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
                      No, cancel
                    </button>
                    <button  onClick={() => handledeletecategory()} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900">
                      Yes, I'm sure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toastify />
      </>
  );
}

export default Categorycomponent;
