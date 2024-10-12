package org.example.productmanagement.Service.Review;

import jakarta.transaction.Transactional;

import org.example.productmanagement.DTO.Review.ReviewReponseDTO;
import org.example.productmanagement.DTO.Review.ReviewRequistDTO;
import org.example.productmanagement.Entites.Review;
import org.example.productmanagement.Mapper.Review.ReviewMapInter;
import org.example.productmanagement.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
public class ReviewServImp implements ReviewServInter {
	@Autowired
	ReviewRepository reviewRepository;
	@Autowired
	ReviewMapInter reviewMapInter;

	@Override
	public void ADD(ReviewRequistDTO reviewRequistDTO) {
		reviewRepository.save(reviewMapInter.FromRequist2Review(reviewRequistDTO));
	}

	@Override
	public ReviewReponseDTO Getone(Long id) {
		Review review = reviewRepository.findById(id).get();
		return reviewMapInter.FromReview2Reponse(review);
	}

	@Override
	public ReviewReponseDTO Getforuser(Long product, Long userid) {
		Review review = reviewRepository.findByIdProductsAndIduser(product, userid);
		ReviewReponseDTO reviewReponseDTO = reviewMapInter.FromReview2Reponse(review);
		return reviewReponseDTO;
	}

	@Override
	public List<ReviewReponseDTO> Getall(Long idproduct) {
		List<Review> reviews = reviewRepository.findByIdProducts(idproduct);
		List<ReviewReponseDTO> reviewReponseDTOS = new ArrayList<>();
		for (Review review : reviews) {
			reviewReponseDTOS.add(reviewMapInter.FromReview2Reponse(review));
		}
		return reviewReponseDTOS;
	}

	@Override
	public void delete(Long id) {
		reviewRepository.deleteById(id);
	}
}
