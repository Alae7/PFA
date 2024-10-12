import React, { useEffect } from 'react'
import { CanvasConfetti, SectionWrapper } from '../../lib';
import "./success.model.css"
import { Link } from 'react-router-dom';

const Success = () => {


  useEffect(() => {
    CanvasConfetti();
    sessionStorage.removeItem('paymentStatus');
  }, []);

  return (
    <>
      <div className='flex justify-center items-center h-screen '>
        <div className="grid justify-items-stretch max-w-4xl p-6 bg-[#FEF9C3] w-full h-2/3 border border-gray-200 rounded-lg shadow">
          <div className='justify-self-center'>
            <svg width="120" height="117" viewBox="0 0 120 117" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="117" fill="#FEF9C3" />
              <path d="M25 107.25H95C100.515 107.25 105 102.877 105 97.5V43.875C105 42.5821 104.473 41.3421 103.536 40.4279C102.598 39.5136 101.326 39 100 39H85V34.125C85 20.6846 73.785 9.75 60 9.75C46.215 9.75 35 20.6846 35 34.125V39H20C18.6739 39 17.4021 39.5136 16.4645 40.4279C15.5268 41.3421 15 42.5821 15 43.875V97.5C15 102.877 19.485 107.25 25 107.25ZM45 34.125C45 26.0618 51.73 19.5 60 19.5C68.27 19.5 75 26.0618 75 34.125V39H45V34.125ZM25 48.75H35V58.5H45V48.75H75V58.5H85V48.75H95L95.01 97.5H25V48.75Z" fill="#15803D" />
              <rect x="24" y="46" width="74" height="53" fill="#15803D" />
              <path d="M55.8405 84L45 73.0977L47.7101 70.3721L55.8405 78.5489L73.2899 61L76 63.7256L55.8405 84Z" fill="white" />
            </svg>
          </div>
          <h5 className="textShadow justify-self-center mb-2 text-3xl mt-4 font-bold tracking-tight text-[#164E63]">Thank You For Your Purchase</h5>
          <p className="justify-self-center font-semibold text-lg text-black ">Check your email inbox for the receipt.</p>
          <p className="justify-self-center font-normal text-gray-700 ">If you have any question, please email </p>
          <span className='text-rose-500 justify-self-center'>Vertex@gmail.com</span>
          <Link type="button" to={"/shop"} className="justify-self-center text-center w-2/5 text-white bg-indigo-600 hover:bg-indigo-800 font-medium rounded-lg text-sm mt-6 py-1.5 pt-2 mb-8">Continue Shoping</Link>
        </div>
      </div>
    </>
  )
}

export default SectionWrapper(Success);