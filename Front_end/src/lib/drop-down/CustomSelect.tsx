import React, { useState, useRef, useEffect } from 'react';

function CustomSelect({ options }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Choose a country');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen((prevState) => !prevState);
    };

    const handleSelect = (option) => {
        setSelectedOption(option.country);
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  py-3 px-3 cursor-pointer flex justify-between items-center"
                onClick={handleToggle}
            >
                <span>{selectedOption}</span>
                <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 12a.997.997 0 0 1-.707-.293l-3-3a1 1 0 0 1 1.414-1.414L10 9.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-3 3A.997.997 0 0 1 10 12z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto w-full">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="py-2 px-4 hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleSelect(option)}
                        >
                            {option.country}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomSelect;
