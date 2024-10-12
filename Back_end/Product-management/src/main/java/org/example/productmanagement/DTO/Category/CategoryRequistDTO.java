package org.example.productmanagement.DTO.Category;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;


@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class CategoryRequistDTO {

	private String name;
	private MultipartFile image;
	private String pub;
}
