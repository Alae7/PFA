import { useEffect, useState } from 'react';
import { country } from '../../../constants'
import { Toastify, Notify, useAuth, ErrorNotify } from '../../../lib'
import { Seller } from '../../../interface/interface';
import urls from '../../../services/urls';


const PersonalInformation = () => {

    const [updateForm, setUpdateForm] = useState<Seller>({ fullName: '', phone: '', country: '', address: '', businessName: '', businessEmail: '', businessAddress: '', paypalEmail: '' });
    const [isDataFetched, setIsDataFetched] = useState(false);
    const { user, updateUser } = useAuth()


    useEffect(() => {
        if (user?.id && !isDataFetched) {
            const fetchUserData = async () => {
                try {
                    if (user?.role) {
                        const response = user.role === 'seller'
                            ? await urls.getSellerById(user.id)
                            : await urls.getUserById(user.id);

                        const userData = response.data;

                        setUpdateForm({
                            id: userData.id || '',
                            fullName: userData.fullName || '',
                            phone: userData.phone || '',
                            country: userData.country || '',
                            address: userData.address || '',
                            businessName: userData.businessName || '',
                            businessEmail: userData.businessEmail || '',
                            businessAddress: userData.businessAddress || '',
                            paypalEmail: userData.paypalEmail || ''
                        });

                        setIsDataFetched(true);
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            if (user?.id) {
                fetchUserData();
            }
        }
    }, [user?.id, user?.role, isDataFetched]);


    useEffect(() => {
        if (isDataFetched) {
          const updateData = {
            fullName: updateForm.fullName,
          };
          updateUser(updateData);
        }
      }, [isDataFetched]);

    const updateUserData = async () => {
        try {
            const response = user?.role === 'seller'
                ? await urls.updateSeller(updateForm)
                : await urls.updateUser(updateForm);

            const updateData = {
                fullName: updateForm.fullName,
            };

            console.log(response.data);
            updateUser(updateData);
            Notify('Information update successfully')

        } catch (error) {
            console.error('Error updating data:', error);
            ErrorNotify('this name already used')
        }
    };

    const updateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateUserData();
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
            <div className="relative grid ">
                <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
                    <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
                        <div className="max-w-xl w-full space-y-12">
                            <h1 className='font-semibold text-3xl'>Personal Information</h1>
                            <div className="lg:text-left text-center">
                                <div className="flex items-center justify-center ">
                                    <div className="flex flex-col w-full ">
                                        <form onSubmit={updateSubmit} className="flex flex-col space-y-2 ">
                                            <label htmlFor='fullName_input' className="font-medium text-lg text-black" >Full Name:</label>
                                            <input id="fullName_input" name='fullName' type="text" placeholder="Full Name" value={updateForm.fullName || ''} onChange={updateChange} className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                            <label htmlFor='address_input' className="font-medium text-lg text-black" >Address:</label>
                                            <input id="address_input" name='address' type="text" placeholder="address" value={updateForm.address || ''} onChange={updateChange} className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                            {user?.role === 'seller' && (
                                                <>
                                                    <label htmlFor='paypal_input' className="font-medium text-lg text-black">Paypal Email:</label>
                                                    <input id="paypal_input" name='paypalEmail' value={updateForm.paypalEmail || ''} onChange={updateChange} type="email" placeholder="Paypal" className="border border-black rounded-lg py-3 px-3 bg-white placeholder-white-500 text-black" />
                                                    <label htmlFor='businessName_input' className="font-medium text-lg text-black" >Business Name:</label>
                                                    <input id="businessName_input" name='businessName' type="text" placeholder="Business Name" value={updateForm.businessName || ''} onChange={updateChange} className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                    <label htmlFor='businessEmail_input' className="font-medium text-lg text-black" >Business Email:</label>
                                                    <input id="businessEmail_input" name='businessEmail' type="text" placeholder="Business Email" value={updateForm.businessEmail || ''} onChange={updateChange} className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                    <label htmlFor='businessAddress_input' className="font-medium text-lg text-black" >Business Address:</label>
                                                    <input id="businessAddress_input" name='businessAddress' type="text" placeholder="Business Address" value={updateForm.businessAddress || ''} onChange={updateChange} className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                </>
                                            )}
                                            <label htmlFor='Phone_input' className="font-medium text-lg text-black " >Phone Number:</label>
                                            <input id="Phone_input" name='phone' type="tel" value={updateForm.phone || ''} onChange={updateChange} placeholder="Phone Number" className="border border-black rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                            <label htmlFor="countries" className="font-medium text-lg text-black">Country</label>
                                            <select id="countries" name="country" value={updateForm.country || ''} onChange={updateChange} className="bg-gray-50 border border-black text-gray-900 text-sm rounded-lg block py-3 px-3 placeholder-gray-400" >
                                                <option value="" disabled>Choose a country</option>
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