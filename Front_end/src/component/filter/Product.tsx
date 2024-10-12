import React, {useEffect, useState} from 'react'
import Nav from './Nav';
import ShopPage from '../shop-page/ShopPage';
import { SectionWrapper } from '../../lib';
import { useLocation } from 'react-router-dom';
import urls from "../../services/urls.ts";
import {Product} from "../../interface/interface.ts";


const ProductComponent  = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category') || -1; // Default to -1 for 'All'

    const [category, setCategory] = useState<number>(parseInt(initialCategory.toString(), 10));
    const [sortOrder, setSortOrder] = useState('latest');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await urls.getProducts();
                setProducts(response.data);
                setLoading(false);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setError('Error fetching products');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const parseDateString = (dateString: string | undefined): number => {
        if (!dateString) return 0; // Fallback to 0 if the date string is undefined
    
        const parts = dateString.split(' ');
        const dateParts = parts[0].split('/'); // Split date part
        const timeParts = parts[1].split(':'); // Split time part
    
        // Create a new Date object (year, month (0-based), day, hours, minutes, seconds)
        const date = new Date(
            parseInt(dateParts[2]), // Year
            parseInt(dateParts[1]) - 1, // Month (0-based)
            parseInt(dateParts[0]), // Day
            parseInt(timeParts[0]), // Hours
            parseInt(timeParts[1]), // Minutes
            parseInt(timeParts[2]) // Seconds
        );
    
        return date.getTime(); // Return the timestamp
    };
    
    const filteredProducts = products
        .filter(product => category === -1 || product.idcategory === category)
        .sort((a, b) => {
            const dateA = parseDateString(a.daTe_creation); // Use the parsing function
            const dateB = parseDateString(b.daTe_creation); // Use the parsing function
    
            if (sortOrder === 'latest') {
                return dateB - dateA; // Sort latest first
            } else {
                return dateA - dateB; // Sort earliest first
            }
        });

    return (
        <div className="flex">
            <Nav
                sortOrder={sortOrder}
                category={category}
                setCategory={setCategory}
                setSortOrder={setSortOrder}
            />
            <ShopPage products={filteredProducts} />
        </div>
    );
};

export default SectionWrapper(ProductComponent );