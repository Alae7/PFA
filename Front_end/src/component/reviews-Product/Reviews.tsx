import React, { useEffect, useState } from 'react';
import { Notify, ErrorNotify, RateUI, RateReview, Toastify, useAuth } from '../../lib';
import { Review, ReviewRequist } from "../../interface/interface";
import urls from "../../services/urls";

const Reviews = ({ idproduct }: { idproduct: number | undefined }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isWritingReview, setIsWritingReview] = useState(false);
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number | null>(null);
    const { user ,isLoggedIn } = useAuth();

    useEffect(() => {
        if (idproduct) {
            fetchReviews();
        }
    }, [idproduct]);

    const fetchReviews = async () => {
        try {
            const response = await urls.getReviews(idproduct);
            setReviews(response.data);
            console.log(response.data)
        } catch (error) {
            console.error("Failed to fetch reviews", error);
        }
    };

    const handleRatingChange = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
    };

    const postReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn) {
            return ErrorNotify('Please log in first');
        }
        if (!comment || rating === null) {
            return ErrorNotify('Please enter a comment, and select a rating');
        }

        const review: ReviewRequist = {
            iduser: parseInt(user.id),
            idproduct,
            date: new Date().toLocaleString(),
            rating,
            comment,
        };

        try {
            await urls.addReview(review);
            Notify('Review created successfully');
            fetchReviews();
            resetForm();
        } catch (error) {
            ErrorNotify('Failed to create review');
            console.error("Error posting review", error);
        }
    };

    const resetForm = () => {
        setComment('');
        setRating(null);
    };

    return (
        <>
            <div className='mb-40'>
                <h1 className='text-2xl text-center'>Review Of Product</h1>
                <div className='flex flex-1 w-full'>
                    <div className="grid h-full w-[600px] mt-20 overflow-hidden">
                        <button
                            className={`mr-4 px-4 py-2 ${!isWritingReview ? 'text-black' : 'text-gray-700'}`}
                            onClick={() => setIsWritingReview(false)}
                        >
                            Show All Reviews
                        </button>
                        <button
                            className={`mr-4 px-4 py-2 ${isWritingReview ? 'text-black' : 'text-gray-700'}`}
                            onClick={() => setIsWritingReview(true)}
                        >
                            Write a Review
                        </button>
                    </div>
                    <div className='w-full mt-20'>
                        {isWritingReview ? (
                            <div className="w-full p-4">
                                <form onSubmit={postReview}>
                                    <div className='mb-4'>
                                        <label htmlFor="rating" className="block mb-2 text-lg font-medium text-gray-900">Rating:</label>
                                        <RateReview onRatingChange={handleRatingChange} />
                                    </div>
                                    <label htmlFor="message" className="block mb-2 text-lg font-medium text-gray-900">Comment:</label>
                                    <textarea
                                        value={comment}
                                        onChange={handleCommentChange}
                                        rows={5}
                                        placeholder="Write your comment here"
                                        className="border rounded p-2 w-full"
                                    />
                                    <button
                                        type='submit'
                                        className="mt-4 ml-4 px-4 py-2 bg-[#052E16] text-white rounded-xl"
                                    >
                                        Submit Review
                                    </button>

                                </form>
                            </div>
                        ) : (
                            <div className="w-full p-4">
                                <h2 className='text-xl mb-4'>All Reviews</h2>
                                {reviews.length > 0 ? (
                                    reviews.map((review) => (
                                        <div key={review.id} className="block max-w-3xl p-6 m-2 bg-white border border-gray-200 rounded-lg shadow">
                                            <div className='flex justify-between'>
                                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                                                    {review.user?.fullName || 'Anonymous'}
                                                </h5>
                                                <h5 className="mb-2 text-base font-medium tracking-tight text-gray-900">
                                                    {review.date}
                                                </h5>
                                            </div>
                                            <p className="font-normal text-gray-700 mb-4 ml-2">{review.comment}</p>
                                            <RateUI rate={review.rating} uniqueId={review.id?.toString() ?? 'unknown' } />
                                        </div>
                                    ))
                                ) : (
                                    <p>No reviews yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Toastify />
        </>
    );
};

export default Reviews;
