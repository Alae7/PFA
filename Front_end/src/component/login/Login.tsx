import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../../interface/interface';
import { useAuth } from '../../lib';


export default function Login() {

    const { login } = useAuth();
    const [formData, setFormData] = useState<User>({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,  
        });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.email == '' || formData.password == '') {
            setErrorMessage('Please fill in all fields.');
        }
        else {
            setErrorMessage('');
            postLog(formData);
            setFormData({ email: '', password: '' });
        }
    };

    async function postLog(addFormData: User) {
        await login(addFormData).then(() => {
            navigate('/')
        })
            .catch(() => {
                setErrorMessage('wrong information.');
            });

    }


    return (
        <>

            <div>
            <div className="bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(/registerImage.jpeg)` }}>
                    <div className="flex flex-col h-screen sm:flex-row items-center md:items-center sm:justify-center md:justify-center flex-auto min-w-0 ">
                        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">

                        <div className="bg-cyan-200/70 mx-4 p-8 rounded-lg shadow-md w-10/12 ">
                                <h1 className='font-semibold text-2xl mb-8 text-center'>Sign in</h1>

                                <div className="lg:text-left text-center">

                                    <div className="flex items-center justify-center ">
                                        <div className="flex flex-col w-full ">

                                            <form onSubmit={handleSubmit} className="flex flex-col space-y-5 ">
                                                <label htmlFor='email_input' className="font-medium text-lg text-black " >Email Adress:</label>
                                                <input id="email_input" name='email' type="text" placeholder="Email" value={formData.email || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                <label htmlFor='password_input' className="font-medium text-lg text-black">Password:</label>
                                                <input id="password_input" name='password' type="password" placeholder="******" value={formData.password || ''} onChange={handleChange} className="border rounded-lg py-3 px-3 bg-white placeholder-white-500 text-black" />
                                                <div className='pt-4'>
                                                    <button className="h-full w-full  bg-teal-600 text-white rounded-lg py-2 font-semibold text-lg" >Login</button>
                                                </div>
                                            </form>
                                            {errorMessage && (
                                                <div className="error-message p-4 mt-4 text-sm rounded-lg bg-orange-200 text-amber-900" role="alert">
                                                    <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                                    <span className="sr-only">Info</span>
                                                    {errorMessage}
                                                </div>
                                            )}
                                            <p className="text-sm flex justify-between font-light text-gray-800 mt-5">
                                                <Link to={"/register"} className="font-semibold text-primary-600 hover:underline">Create an account?</Link>
                                                <Link to={"/ForgotPassword"} className="font-semibold text-primary-600 hover:underline">Forgot password?</Link>
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
