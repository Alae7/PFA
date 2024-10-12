import React, { useState, useEffect } from 'react';
import urls from '../../services/urls';


const Verification = ({ setShowDetails }) => {
  const [formData, setFormData] = useState({
    email: '', 
    codes: Array(6).fill(''),
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email'); 
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  const handleVerifyCode = async () => {
    const { email, codes } = formData;
    if (!email) {
      setErrorMessage('No email found.');
      return;
    }
    try {
      await urls.verifyResetCode(email, codes.join(''));
      setErrorMessage('');
      setShowDetails('newPassword');
    } catch (error) {
      console.error(error);
      setErrorMessage('Invalid code. Please try again.');
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
      const newCodes = [...formData.codes];
      newCodes[index] = value;
      setFormData((prev) => ({ ...prev, codes: newCodes }));
      if (index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6); 
    const newCodes = [...formData.codes];

    pasteData.split('').forEach((char, index) => {
      if (index < 6) {
        newCodes[index] = char;
      }
    });

    setFormData((prev) => ({ ...prev, codes: newCodes }));
    const nextInputIndex = pasteData.length < 6 ? pasteData.length : 5;
    document.getElementById(`code-${nextInputIndex}`)?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.codes.join('').length === 6) {
      handleVerifyCode();
    } else {
      setErrorMessage('Please complete all the code fields.');
    }
  };

  const handleResendCode = async () => {
    const storedEmail = localStorage.getItem('email');
    try {
        const response = await urls.forgotPassword(storedEmail);
        console.log(response);
        setErrorMessage('');
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className="flex items-center justify-center">
      <div className="p-8 rounded w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Verify Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {formData.codes.map((code, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                value={code}
                onChange={(e) => handleChange(e, index)}
                onPaste={handlePaste}
                maxLength={1}
                className="w-12 h-12 text-center text-2xl font-semibold border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                aria-label={`Verification code digit ${index + 1}`}
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
            disabled={!formData.codes.every((code) => code !== '')}
          >
            Verify Account
          </button>
          {errorMessage && (
              <div className="error-message p-4 mt-4 text-sm text-left rounded-lg bg-orange-200 text-red-800" role="alert">
                  <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Info</span>
                  {errorMessage}
              </div>
          )}
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Didn't receive code? <button  onClick={handleResendCode} className="text-indigo-600 hover:underline">Resend</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Verification;
