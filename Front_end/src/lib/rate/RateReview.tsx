import React, { useState } from 'react';

const RateReview = ({ onRatingChange }: { onRatingChange: (rating: number) => void }) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleRatingChange = (value: number) => {
        setSelectedRating(value);
        onRatingChange(value); // Pass the selected rating back to the parent component
    };

    return (
        <div className='self-center content-center mt-2 ml-4'>
            <div className="flex flex-row-reverse justify-end items-center relative">
                {[5, 4, 3, 2, 1].map((value) => (
                    <React.Fragment key={value}>
                        <input
                            id={`hs-ratings-${value}`}
                            type="radio"
                            className="peer -ms-5 size-5 bg-transparent border-0 text-transparent cursor-pointer appearance-none checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
                            name="hs-ratings"
                            value={value}
                            checked={selectedRating === value} // Check if this star is the current selection
                            onChange={() => handleRatingChange(value)} // Handle change event
                        />
                        <label
                            htmlFor={`hs-ratings-${value}`}
                            className={`pointer-events-none ${selectedRating >= value ? 'text-yellow-600' : 'text-gray-400'}`}
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
                ))}
            </div>
        </div>
    );
};

export default RateReview;