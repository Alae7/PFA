import React from 'react';

interface RateUIProps {
    rate: number | undefined;
    uniqueId: string | undefined;
}

export default function RateUI({ rate, uniqueId }: RateUIProps) {
    // Generate an array of 5 elements representing the star ratings
    const totalStars = 5;

    return (
        <div  className='self-center content-center mt-2 ml-4'>
            <div className="flex flex-row-reverse justify-end items-center relative">
                {[...Array(totalStars)].map((_, index) => {
                    const starValue = totalStars - index;  // Reverse the index so that it goes 5, 4, 3, 2, 1
                    return (
                        <React.Fragment key={starValue}>
                            <input
                                id={`hs-ratings-readonly-${uniqueId}-${starValue}`}
                                type="radio"
                                className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                                name={`hs-ratings-readonly-${uniqueId}`} 
                                value={starValue}
                                disabled
                                checked={rate === starValue}  // Check if this star is the current rating
                            />
                            <label
                                htmlFor={`hs-ratings-readonly-${uniqueId}-${starValue}`}
                                className={`pointer-events-none peer-checked:text-yellow-600 text-gray-400`}
                            >
                                <svg
                                    className="flex-shrink-0 size-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                </svg>
                            </label>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
