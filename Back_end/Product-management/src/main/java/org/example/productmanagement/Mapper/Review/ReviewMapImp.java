package org.example.productmanagement.Mapper.Review;


import org.example.productmanagement.DTO.Review.ReviewReponseDTO;
import org.example.productmanagement.DTO.Review.ReviewRequistDTO;
import org.example.productmanagement.Entites.Review;
import org.example.productmanagement.Model.User;
import org.example.productmanagement.Repository.ProductRepository;
import org.example.productmanagement.Web.UserControllers.UserOpenFeginController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;




@Component
public class ReviewMapImp implements ReviewMapInter {
	@Autowired
	ProductRepository productRepository;
	@Autowired
	UserOpenFeginController userOpenFeginController;


	@Override
	public Review FromRequist2Review(ReviewRequistDTO reviewRequistDTO) {
		Review review = new Review();
		review.setIduser(reviewRequistDTO.getIduser());
		review.setIdProducts(reviewRequistDTO.getIdproduct());
		review.setComment(reviewRequistDTO.getComment());
		review.setRating(reviewRequistDTO.getRating());
		review.setDate(reviewRequistDTO.getDate());
		return review;
	}

	@Override
	public ReviewReponseDTO FromReview2Reponse(Review review) {
		ReviewReponseDTO reviewReponseDTO = new ReviewReponseDTO();
		reviewReponseDTO.setProduct(productRepository.findById(review.getIdProducts()).get());
		User user = userOpenFeginController.findOneUser(review.getIduser());
		reviewReponseDTO.setId(review.getId());
		reviewReponseDTO.setUser(user);
		reviewReponseDTO.setComment(review.getComment());
		reviewReponseDTO.setRating(review.getRating());
		reviewReponseDTO.setDate(review.getDate());
		return reviewReponseDTO;
	}
}
