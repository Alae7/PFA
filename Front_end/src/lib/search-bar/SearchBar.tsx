import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchBarProps = {
    onSearch: (categoryName: string) => void; 
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch(inputValue); 
            navigate('/search'); 
            setInputValue(''); 
        }
    };

    return (
        <div className="relative md:w-6/12 w-full col-span-2 justify-self-center mr-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyPress} className="w-full px-10 py-2.5 rounded-lg text-gray-500 outline-none text-sm" placeholder="Search..." />
        </div>
    )
}



export default SearchBar