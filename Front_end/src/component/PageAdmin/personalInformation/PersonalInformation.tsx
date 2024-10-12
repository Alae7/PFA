import { useEffect, useState } from 'react';
import { country } from '../../../constants'
import { Toastify, Notify, useAuth, ErrorNotify } from '../../../lib';
import urls from '../../../services/urls';
import { User } from '../../../interface/interface';


const PersonalInformation = () => {

    const [updateForm, setUpdateForm] = useState<User>({ fullName: '', phone: '', country: '', address: ''});
    const [isDataFetched, setIsDataFetched] = useState(false);
    const { user, updateUser } = useAuth()
    
    
    useEffect(() => {
        if (user?.id && !isDataFetched) {
        const fetchUserData = async () => {
            try {
                const response = await urls.getAdminsById(user?.id);
                const adminData = response.data; 

                setUpdateForm({
                    id: adminData.id || '',
                    fullName: adminData.fullName || '',
                    phone: adminData.phone || '',
                    country: adminData.country || '',
                    address: adminData.address || '',
                });

                updateUser(adminData);
                setIsDataFetched(true);


            } catch (error) {
                console.error('Error fetching authenticated admin data:', error);
            }
        };
    
        fetchUserData();
    }
    }, [user?.id, isDataFetched, updateUser]);
    
    
    async function updateAdmins() {
        await urls.updateAdmins(updateForm).then(response => {
            console.log(response.data);
            updateUser(updateForm);
            Notify('Information update successfully')
        })
            .catch(e => {
                console.log(e);
                ErrorNotify('this name already used')
            });
    
    }
    
    const updateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateAdmins();
    };
    const updateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUpdateForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="relative  grid ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
                    <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
                        <div className="max-w-xl w-full space-y-12">
                            <h1 className='font-semibold text-3xl'>Personal Information</h1>
                            <div className="lg:text-left text-center">
                                <div className="flex items-center justify-center ">
                                    <div className="flex flex-col w-full ">
                                        <form onSubmit={updateSubmit} className="flex flex-col space-y-2 ">
                                            <label htmlFor='username_input' className="font-medium text-lg text-black" >Full Name:</label>
                                            <input id="username_input" name='fullName' type="text" value={updateForm.fullName || ''} onChange={updateChange} placeholder="Full Name" className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                            <label htmlFor='Phone_input' className="font-medium text-lg text-black " >Phone Number:</label>
                                            <input id="Phone_input" name='phone' type="tel" placeholder="Phone Number" value={updateForm.phone || ''} onChange={updateChange} className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                            <label htmlFor='address_input' className="font-medium text-lg text-black " >Address:</label>
                                            <input id="address_input" name='address' type="text" placeholder="Address" value={updateForm.address || ''} onChange={updateChange} className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                            <label htmlFor="countries" className="font-medium text-lg text-black">Country</label>
                                            <select name='country' value={updateForm.country || ''} id="countries" onChange={updateChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg block py-3 px-3 placeholder-gray-400" >
                                                <option disabled>Choose a country</option>
                                                {
                                                    country.map((item, index) => (
                                                        <option key={index} value={item.country}> {item.country} </option>
                                                    ))
                                                }
                                            </select>
                                            <div className='pt-4'>
                                                <button type='submit' className="border h-full w-full  bg-black text-white rounded-lg py-3 font-semibold text-lg" >Update Account</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toastify />
        </>
    )
}

export default PersonalInformation
