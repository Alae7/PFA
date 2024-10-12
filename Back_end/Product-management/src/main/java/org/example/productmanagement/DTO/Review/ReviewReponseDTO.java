package org.example.productmanagement.DTO.Review;


import lombok.*;

import org.example.productmanagement.Entites.Product;
import org.example.productmanagement.Model.User;

import java.util.Date;


@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class ReviewReponseDTO {
	private Long id;
	private User user;
	private Product product;
	private String date;
	private int rating;
	private String comment;
}
