import React, { createContext, useState, useContext, useEffect } from 'react';
import { Category, Product } from '../../interface/interface';
import urls from '../../services/urls';

type SearchContextType = {
    searchResults: Product[];
    categories: Category[];
    handleSearch: (categoryName: string) => void; // Changed to accept category name
    loading: boolean;
    error: string | null;
};

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await urls.getCategories();
                setCategories(response.data);
            } catch (err) {
                setError(`Error fetching categories: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);


    const fetchAllProducts = async (): Promise<Product[]> => {
        try {
            const response = await urls.getProducts();
            return response.data;
        } catch (err) {
            setError(`Error fetching products: ${err}`);
            return [];
        }
    };

    // Fetch products by category
    const fetchProductsByCategory = async (categoryId: number): Promise<Product[]> => {
        try {
            const response = await urls.getProductsByCategory(categoryId);
            return response.data;
        } catch (err) {
            setError(`Error fetching products by category: ${err}`);
            return [];
        }
    };

    // Main search function
    const handleSearch = async (searchTerm: string) => {
        setLoading(true);
        setError(null);
    
        try {
            // Fetch all products
            const allProducts = await fetchAllProducts();
    
            // Filter products by name (case insensitive)
            const matchingProductsByName = allProducts.filter(product =>
                product.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            // Filter categories by name (case insensitive)
            const matchingCategories = categories.filter(category =>
                category.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
    
            // Fetch products by matching category IDs
            const categoryIds = matchingCategories.map(category => category.id);
            const categoryProductsPromises = categoryIds.map(categoryId =>
                fetchProductsByCategory(categoryId!)
            );
            const categoryProductsResults = await Promise.all(categoryProductsPromises);
    
            // Combine all products from matching categories
            const matchingProductsByCategory = categoryProductsResults.flat();
    
            // Combine both name-matching products and category-related products
            const combinedResults = [...matchingProductsByName, ...matchingProductsByCategory];
    
            // Remove duplicates based on idProduct
            const uniqueResults = Array.from(
                new Set(combinedResults.map(product => product.idProduct))
            ).map(id => combinedResults.find(product => product.idProduct === id)!);
    
            // Set the combined results as search results
            setSearchResults(uniqueResults);
    
            // If no products are found
            if (uniqueResults.length === 0) {
                setError("No products found matching that name or category.");
            }
        } catch (err) {
            setError(`Error during search: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SearchContext.Provider value={{ searchResults, categories, handleSearch, loading, error }}>
            {children}
        </SearchContext.Provider>
    );
};