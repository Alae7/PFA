import React, { useEffect, useState } from "react";
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import './carousel.model.css'
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { Category } from "../../interface/interface.ts";
import urls from "../../services/urls.ts";


const Carousels = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    // Fetch categories data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await urls.getCategories();
                if (response.data) {
                    // Get the last 10 categories
                    setCategories(response.data.slice(-10));
                }
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };
        fetchCategories();
    }, []);


    const handleCategoryClick = (categoryId: number | undefined) => {
        if (categoryId !== undefined) {
            navigate(`/shop?category=${categoryId}`);
        }
    };

        return (
            <div className='carousel-container w-full'>
                <Carousel
                    autoPlay={true}
                    indicators={true}
                    indicatorContainerProps={{
                        style: {
                            position: 'absolute',
                            bottom: '10px',
                            textAlign: 'center',
                            width: '100%',
                            zIndex: 1,
                        }
                    }}
                    indicatorIconButtonProps={{
                        style: {
                            padding: '5px',
                            color: '#f0fdfa',
                        }
                    }}
                    activeIndicatorIconButtonProps={{
                        style: {
                            color: '#38bdf8'
                        }
                    }}
                    navButtonsAlwaysVisible={true}
                    navButtonsProps={{
                        style: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: 50,
                        }
                    }}
                    navButtonsWrapperProps={{
                        style: {
                            bottom: '50%',
                            top: 'auto',
                            transform: 'translateY(50%)'
                        }
                    }}
                >
                {categories.map((item, i) => (
                <Paper key={i}>
                    <div onClick={() => handleCategoryClick(item.id)} className="card-container flex h-[500px]">
                        <div className="card w-full flex">
                            <div className="card-left w-1/2 flex pl-20  bg-black">
                                <TypeAnimation
                                    className="title fron-text-gradient text-white text-2xl"
                                    sequence={[`${item.pub}`, 3000]}
                                    speed={50}
                                    repeat={Infinity}
                                />
                            </div>
                            <div className="card-right w-1/2 flex justify-end items-center bg-black overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.pub}
                                    className="h-full w-auto bg-auto object-contain" // Adjusted for better fit
                                />
                            </div>
                        </div>
                    </div>
                </Paper>
            ))}
                </Carousel>
            </div>
        );
}


export default Carousels;
