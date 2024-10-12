import React, { useEffect, useState } from 'react';
import { Rate } from "../../interface/interface.ts";
import urls from "../../services/urls.ts";

export default function RateAd({ idproduct }) {
    const [rateAd, setRateAd] = useState<Rate | null>(null);

    const getRate = async () => {
        try {
            const response = await urls.getRating(idproduct);
            setRateAd(response.data);
        } catch (error) {
            console.error("Error fetching rating:", error);
        }
    };

    useEffect(() => {
        getRate();
    }, [idproduct]);

    const rating = rateAd?.rating ?? 0; // Use 0 as default if rating is not available

    return (
        <div className='self-center content-center'>
            {rateAd && (
                <div className="flex items-center">
                    <p className="text-sm font-medium text-black underline hover:no-underline">{rateAd.nbReview} reviews</p>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>

                    {/* Render stars left to right */}
                    {
                        Array.from({ length: 5 }, (_, index) => {
                            const starValue = index + 1;
                            const isFullStar = starValue <= Math.floor(rating);
                            const isHalfStar = starValue === Math.ceil(rating) && rating % 1 !== 0;

                            return (
                                <div key={index} className="relative">
                                    {/* Gray star in the background */}
                                    <svg className="flex-shrink-0 size-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg>

                                    {/* Yellow star for rating */}
                                    {isFullStar && (
                                        <svg className="absolute top-0 left-0 flex-shrink-0 size-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                        </svg>
                                    )}

                                    {/* Half yellow star */}
                                    {isHalfStar && (
                                        <svg className="absolute top-0 left-0 flex-shrink-0 size-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <defs>
                                                <clipPath id={`clip-${index}`}>
                                                    <rect x="0" y="0" width="8" height="16" />
                                                </clipPath>
                                            </defs>
                                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" clipPath={`url(#clip-${index})`} />
                                        </svg>
                                    )}
                                </div>
                            );
                        })
                    }
                    <p className="ms-1 text-sm font-medium text-gray-600">{rating}</p>
                    <p className="ms-1 text-sm font-medium text-gray-600 mr-2">out of</p>
                    <p className="ms-1 text-sm font-medium text-gray-600">5</p>
                </div>
            )}
        </div>
    );
}