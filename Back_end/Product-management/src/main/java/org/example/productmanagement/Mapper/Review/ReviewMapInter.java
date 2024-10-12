package org.example.productmanagement.Mapper.Review;



import org.example.productmanagement.DTO.Review.ReviewReponseDTO;
import org.example.productmanagement.DTO.Review.ReviewRequistDTO;
import org.example.productmanagement.Entites.Review;

public interface ReviewMapInter {
	public Review FromRequist2Review(ReviewRequistDTO reviewRequistDTO);
	public ReviewReponseDTO FromReview2Reponse(Review review);
}
