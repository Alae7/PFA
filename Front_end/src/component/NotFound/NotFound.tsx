import React from 'react'
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <main className="flex justify-center items-center h-screen">
            <div className='grid justify-items-stretch max-w-4xl p-6 w-full'>
                <FaceFrownIcon className="justify-self-center w-28 h-25 text-black" />
                <h2 className="justify-self-center text-lg text-black font-semibold">404 Not Found</h2>
                <p className='justify-self-center mt-4'>Your visited page not found. You may go shop page.</p>
                <Link
                    to={"/shop"}
                    className="justify-self-center mt-8 text-center  text-black font-medium focus:outline-none rounded-lg border bg-slate-300 border-gray-600 hover:text-white hover:bg-gray-700 py-1.5 px-14"
                >
                    Back To shop Page
                </Link>
            </div>
        </main>
    );
}

export default NotFound