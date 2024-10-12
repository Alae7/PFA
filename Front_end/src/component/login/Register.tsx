import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { country } from '../../constants';
import { User } from '../../interface/interface';
import { useAuth } from '../../lib';


export default function Register() {

    const { signup } = useAuth();
    const [formData, setFormData] = useState<User>({ fullName: '',phone:'',country:'', address:'',  email: '', password: '', confirmation: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.fullName == '' || formData.phone == '' || formData.country == '' || formData.address == ''  || formData.email == '' || formData.password == '' || formData.confirmation == '' ) {
          setErrorMessage('Please fill in all fields.');
        } else {
          setErrorMessage('');
          postLog(formData);
          setFormData({ fullName: '',phone:'',country:'', address:'',  email: '', password: '', confirmation: '' });
        }
      };

      async function postLog(addFormData: User) {
        if(addFormData.password != addFormData.confirmation){
            setErrorMessage('wrong confirmation')
            return; 
        }
        await signup(addFormData).then(() => {
            navigate('/')
        })
          .catch(() => {
            setErrorMessage('username or email already exists')
          });
      }
      
    return (
        <>

            <div>
            <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(/registerImage.jpeg)` }}>
                    <div className="flex flex-col sm:flex-row items-center md:items-center sm:justify-center md:justify-center flex-auto min-w-0 ">
                        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">

                            <div className="bg-cyan-200/70 mx-4 p-8 rounded-lg shadow-md w-10/12 space-y-12">
                                <div>
                                    <h1 className='font-semibold text-3xl'>Create Account</h1>
                                    <h1 className='font-medium text-lg text-emerald-800 ml-2'>Please enter details</h1>
                                </div>
                                <div className="lg:text-left text-center">

                                    <div className="flex items-center justify-center ">
                                        <div className="flex flex-col w-full ">

                                            <form onSubmit={handleSubmit} className="flex flex-col space-y-2 ">
                                                <label htmlFor='fullName_input' className="font-medium text-lg text-black " >Full Name:</label>
                                                <input id="fullName_input" name='fullName' type="text" placeholder="Full Name" value={formData.fullName || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                <label htmlFor='email_input' className="font-medium text-lg text-black">Email Adress:</label>
                                                <input id="email_input" name='email' type="email" placeholder="Email" value={formData.email || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 bg-white placeholder-white-500 text-black" />
                                                <label htmlFor='phone_input' className="font-medium text-lg text-black " >Phone Number:</label>
                                                <input id="phone_input" name='phone' type="tel" placeholder="Phone Number" value={formData.phone || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                <label htmlFor='address_input' className="font-medium text-lg text-black " >Address:</label>
                                                <input id="address_input" name='address' type="text" placeholder="Address" value={formData.address || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                <label htmlFor='password' className="font-medium text-lg text-black">Password:</label>
                                                <input id="password" name='password' type="password" placeholder="******" value={formData.password || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 bg-white placeholder-white-500 text-black" />
                                                <label htmlFor='Confirmation_input' className="font-medium text-lg text-black">Confirmation:</label>
                                                <input id="Confirmation_input" name='confirmation' type="password" placeholder="******" value={formData.confirmation || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 bg-white placeholder-white-500 text-black" />
                                                <label htmlFor="countries" className="font-medium text-lg text-black">Country</label>
                                                <select id="countries" name='country' value={formData.country || ''} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block py-3 px-3 placeholder-gray-400" >
                                                    <option value="" disabled>Choose a country</option>
                                                    {
                                                        country.map((item, index) => (
                                                            <option key={index} value={item.country}> {item.country} </option>
                                                        ))
                                                    }
                                                </select>
                                                <div className='pt-4'>
                                                    <button className="h-full w-full bg-teal-600 text-white rounded-lg py-2 font-semibold text-lg" >Sign up</button>
                                                </div>
                                            </form>
                                            {errorMessage && (
                                                <div className="error-message p-4 mt-4 text-sm rounded-lg bg-orange-200 text-amber-900" role="alert">
                                                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                                    <span className="sr-only">Info</span>
                                                    {errorMessage}
                                                </div>
                                            )}
                                            <p className="text-sm font-semibold text-gray-800 mt-5">
                                                Already have an account? <Link to={"/login"} className="font-medium text-primary-600 hover:underline text-sky-900">Log In here.</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
