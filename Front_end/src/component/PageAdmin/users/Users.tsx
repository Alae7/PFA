import { useEffect, useState } from 'react'
import urls from '../../../services/urls';
// import { useAuth } from '../../../lib';
import { User } from '../../../interface/interface';
import { ErrorNotify, Notify, Pagination, Toastify, usePagination } from '../../../lib';




const Users = () => {

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateForm, setUpdateForm] = useState<User>({ email: '', password: '' });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [idDeleteModal, setIdDeleteModal] = useState(undefined);
  const [userData, setUserData] = useState<User[]>([]);
  const [items, setItems] = useState<User[]>([]); 
  const [searchText, setSearchText] = useState(''); 
  // const { user, isLoggedIn } = useAuth();
  const { currentPage, paginatedData, setCurrentPage, pageSize } = usePagination(userData);


  function showDeleteModel(id) {
    setIdDeleteModal(id)
    setDeleteModalOpen(!deleteModalOpen)
  }

  function showUpdateModel(user: User) {
    setIsUpdateModalOpen(!isUpdateModalOpen)
    setUpdateForm({
      id: user.id || '',
      email: user.email || '',
      password: '',
    });
  }

  function closeUpdateModel() {
    setIsUpdateModalOpen(false);
  }

  const fetchUserData = async () => {
    // if (isLoggedIn && user?.role == "admin" ) {
    try {
      const response = await urls.getUsers()
      const data = await response.data
      setUserData(data);
      setItems(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
  // };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    if (value.trim() === '') {
      setUserData(items); 
    } else {
      const filteredAdmin = items.filter((user) =>
        (user.email && user.email.toLowerCase().includes(value)) ||
        (user.fullName && user.fullName.toLowerCase().includes(value))
      );
      setUserData(filteredAdmin);
    }
  };

  async function updateUsers() {
    try {
      await urls.updateUsers(updateForm);
      closeUpdateModel();
  
      const updatedUserResponse = await urls.getUserById(updateForm.id);
      const updatedUser = updatedUserResponse.data;
  
      setUserData((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
  
      Notify('Information updated successfully');
    } catch (e) {
      console.log('Error:', e);
      ErrorNotify('Error occurred');
    }
  }

  const updateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateUsers();
  };
  const updateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  async function deleteUsers(id) {
    try {
      await urls.deleteUsers(id);  

      setUserData((prevData) => prevData.filter(user => user.id !== id));

      setDeleteModalOpen(false);  

      Notify('Information deleted successfully');

    } catch (e) {
      console.log("Delete failed:", e);
      Notify('Delete failed');
    }
  }

  return (
    <>
    <div className="relative min-h-screen  grid">
      <div className=" overflow-auto sm:rounded-lg   ml-16">
        <div className='flex  justify-between'>
          <div className='relative w-full max-w-96 mt-3 mb-5'>
            <h1 className='font-semibold text-3xl'>Users</h1>
          </div>
          <div className="relative w-full max-w-96 mt-3 mb-5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" id="simple-search" value={searchText} onChange={handleSearch} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 " placeholder="Search" required />
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500  md:max-lg:w-[769px] max-[600px]:w-[769px]">
          <thead className="text-xs text-gray-700 uppercase bg-green-300 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                role
              </th>
              <th scope="col" className="px-6 py-3">

              </th>
              <th scope="col" className="px-6 py-3">

              </th>

            </tr>
          </thead>
          {paginatedData.map((user) => (
            <tbody key={user?.id}>
              <tr className="bg-white border-b">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {user?.fullName}
                </th>
                <td className="px-6 py-4">
                  {user?.email}
                </td>
                <td className="px-6 py-4">
                  {user?.role}
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => showDeleteModel(user.id)} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm px-5 py-2 text-center ">Delete</button>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => showUpdateModel(user)} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center  ">Update</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {userData.length > 10 && (
        <Pagination<User>
          items={userData}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        )}
      </div>

      <div className={` z-20 w-full ${deleteModalOpen ? '' : 'hidden'}`}>
        <div className="h-screen w-screen bg-black opacity-50 fixed top-0 left-0"></div>
        <div id="deleteModal" tabIndex={-1} aria-hidden="true" className=" justify-center  grid content-center fixed top-0 overflow-y-auto overflow-x-hidden right-0 left-0 z-50  items-center w-full md:inset-0 md:h-full">
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
              <button onClick={showDeleteModel} type="button" className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="deleteModal">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg className="text-gray-400 w-11 h-11 mb-3.5 mx-auto" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              <p className="mb-4 text-gray-500">Are you sure you want to delete this user?</p>
              <div className="flex justify-center items-center space-x-4">
                <button onClick={showDeleteModel} data-modal-toggle="deleteModal" type="button" className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10">
                  No, cancel
                </button>
                <button onClick={() => deleteUsers(idDeleteModal)} type="submit" className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300">
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={` z-30 ${isUpdateModalOpen ? '' : 'hidden'}`}>
        <div className="h-screen w-screen bg-black opacity-50 fixed top-0 left-0"></div>
        <div id="defaultModalUpdate" tabIndex={-1}  className="scrollbar-none justify-center grid content-center fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="w-[800px] relative bg-white rounded-lg shadow">
              <div className="flex items-start justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semi-bold text-gray-900">
                  Update User
                </h3>
                <button onClick={closeUpdateModel} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="defaultModal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={updateSubmit}>
                <div className="relative px-5 z-0 w-full mb-6 group mt-8">
                  <label htmlFor="email-input-Update" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                  <input id="email-input-Update" name="email" value={updateForm.email || ''} onChange={updateChange} placeholder="Write email here..." type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="relative px-5 z-0 w-full mb-6 group mt-8">
                  <label htmlFor="password-update-Admin" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input id="password-update-Admin" name="password" value={updateForm.password || ''} onChange={updateChange} placeholder="Write password here..." type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                  <button data-modal-hide="defaultModalUpdate" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                  <button onClick={closeUpdateModel} data-modal-hide="defaultModalUpdate" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Decline</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toastify />
    </>
  )
}

export default Users