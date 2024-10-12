import React, {useEffect} from 'react';
import PhotoScroll from './PhotoScroll';
import {Product} from "../../interface/interface.ts";
import urls from "../../services/urls.ts";

const CarouselProduct = ({ currentCategory }) => {
    const [products, setProducts] = React.useState<Product[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const reponse = await urls.getProductsByCategory(currentCategory);
                setProducts(reponse.data);
            } catch (error) {
                console.error("Error getProducts", error);
            }
        }
        getProducts();
    }, [currentCategory]);

    const imageData = products.map(item => item.image);
    const hrefs = products.map(item => item.idProduct);

    return (
        <div className='h-[530px]'>
            <h1 className='text-2xl text-center'>You May Also Like</h1>
            <div className="w-full top-0 h-full overflow-hidden">
                <PhotoScroll imageData={imageData}  href={hrefs} />
            </div>
        </div>
    );
}

export default CarouselProduct;
