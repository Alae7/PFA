package org.example.productmanagement.DTO.Review;


import lombok.*;
import org.example.productmanagement.Entites.Review;
import org.example.productmanagement.Model.User;

import java.util.Date;
import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class ReviewRequistDTO {

	private Long iduser;
	private Long idproduct;
	private String date;
	private int rating;
	private String comment;
}
