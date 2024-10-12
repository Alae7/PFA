import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Verification from './Verification';
import urls from '../../services/urls';
import { Notify } from '../../lib';


export default function ForgotPassword() {

    const [showDetails, setShowDetails] = useState('Forgot');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleButtonClick = (page) => {
        setShowDetails(page);
    };


    const handleForgotPassword = async () => {
        try {
            const response = await urls.forgotPassword(email); 
            console.log(response);
            setErrorMessage('');
            localStorage.setItem('email', email); 
            handleButtonClick('verification') 
        } catch (error) {
            console.log(error);
            setErrorMessage('User not found or error occurred.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match!"); 
            return;
        }
        try {
            const response = await urls.resetPassword(email, newPassword);
            console.log(response);
            navigate('/login');
            Notify('Password successfully reset.');
        } catch (error) {
            console.log(error);
            setErrorMessage('Error resetting password. Please try again.');
        }
    };

    return (
        <>

            <div>
                <div className="relative min-h-screen  grid bg-indigo-100 ">
                    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
                        <div className="md:flex md:items-center md:justify-left w-full sm:w-auto md:h-full xl:w-1/2 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
                            <div className="max-w-xl w-full space-y-12">
                                <div>
                                    <Link to={"/login"}>
                                        <ArrowBackIosNewIcon className='mb-3 top-0 h-5 w-5' /> <span className='font-bold text-3xl ml-4'>Back</span>
                                    </Link>
                                </div>
                                {showDetails === 'Forgot' ? (
                                    <div>
                                        <div>
                                            <h1 className='font-semibold text-3xl'>Forgot Password</h1>
                                            <h1 className='font-medium text-lg text-emerald-800 ml-2 mb-8'>Enter your registered email address. we’ll send you a code to reset your password.</h1>
                                        </div>
                                        <div className="lg:text-left text-center">
                                            <div className="flex items-center justify-center ">
                                                <div className="flex flex-col w-full ">
                                                    <form onSubmit={(e) => {
                                                        e.preventDefault();
                                                        handleForgotPassword();
                                                    }} className="flex flex-col space-y-2 ">
                                                        <label htmlFor='email_input' className="font-medium text-lg text-black " >Email Adress:</label>
                                                        <input id="email_input" name='email' onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" className="border rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                        <div className='pt-4'>
                                                            <button type="submit" className="border h-full w-full  bg-black text-white rounded-lg py-3 font-semibold text-lg" >Recover Password</button>
                                                        </div>
                                                    </form>
                                                    {errorMessage && (
                                                            <div className="error-message p-4 mt-4 text-sm text-left rounded-lg bg-orange-200 text-red-800" role="alert">
                                                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                                                                <span className="sr-only">Info</span>
                                                                {errorMessage}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : showDetails == 'verification' ? (
                                    <div className=''>
                                        <Verification setShowDetails={setShowDetails} />
                                    </div>
                                ) : showDetails == 'newPassword' ? (
                                    <div className=''>
                                        <div>
                                            <h1 className='font-semibold text-3xl mb-8'>New Password</h1>
                                        </div>
                                        <div className="lg:text-left text-center">
                                            <div className="flex items-center justify-center ">
                                                <div className="flex flex-col w-full ">
                                                    <form className="flex flex-col space-y-2 ">
                                                        <label htmlFor='password_input' className="font-medium text-lg text-black " >Password:</label>
                                                        <input id="password_input" name='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder="******" className="border rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                        <label htmlFor='confirmation_input' className="font-medium text-lg text-black " >Confirmation:</label>
                                                        <input id="confirmation_input" name='confirmPassword' type="password" placeholder="******" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border rounded-lg py-3 px-3 mt-2 bg-white placeholder-white-500 text-black" />
                                                        <div className='pt-4'>
                                                            <button type='submit' onClick={handleResetPassword} className="border h-full w-full  bg-black text-white rounded-lg py-3 font-semibold text-lg" >Submit</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-1/2 h-screen hidden lg:block">
                            <img src="forgot-password-image.jfif" alt="Placeholder Image" className="object-cover w-full h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
