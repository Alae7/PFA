import React, {useEffect, useState} from 'react'
import {sort } from '../../constants'
import { useNavigate } from 'react-router-dom';
import {Category} from "../../interface/interface.ts";
import urls from "../../services/urls.ts";

const Nav = ({ setCategory, setSortOrder, category, sortOrder }) => {
    // State to store fetched categories
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    // Fetch categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await urls.getCategories();
                if (response.data) {
                    setCategories([{ id: -1, name: 'All' }, ...response.data]); // Adding 'All' option
                }
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);


    // Handle category change using category ID
    const handleCategoryChange = (categoryId: number | undefined) => {
        if (categoryId !== undefined) {
            setCategory(categoryId); // Set the category state with the selected ID
            navigate(`/shop?category=${categoryId}`); // Navigate using the category ID
        }
    };
    return (
        <nav className={`rounded-3xl top-0 m-4 left-0 h-full w-64 bg-[#d4d4d4] z-0`}>
            <div className="p-5 w-64 h-full z-20 top-0 lg:left-0 lg:w-60 peer-focus:left-0">
                <div className="flex flex-col justify-start item-center">
                    <h1 className="text-xl font-bold text-black w-full pb-4 mt-4 ml-2">Product Category</h1>
                    <div className="">
                        {categories?.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={`check-${item.id}`}>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleCategoryChange(item.id)}
                                        checked={category === item.id}
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                        id={`check-${item.id}`}
                                    />
                                    <span
                                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                             stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label className="text-lg font-semibold text-gray-700 cursor-pointer select-none" htmlFor={`check-${item.id}`}>
                                    {item.name}
                                </label>
                            </div>
                        ))}
                        <h1 className='text-black text-xl font-bold w-full mb-2 mt-6'>Sort By</h1>
                        {sort?.map((item1, j) => (
                            <div key={j} className="flex items-center">
                                <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={`check-sort-${item1.name}`}>
                                    <input
                                        type="checkbox"
                                        onChange={() => setSortOrder(item1.name)}
                                        checked={sortOrder === item1.name}
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-black transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                        id={`check-sort-${item1.name}`}
                                    />
                                    <span
                                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                             stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd"
                                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                  clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label className="mt-px font-semibold text-lg text-gray-700 cursor-pointer select-none" htmlFor={`check-sort-${item1.name}`}>
                                    {item1.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );

}

export default Nav;