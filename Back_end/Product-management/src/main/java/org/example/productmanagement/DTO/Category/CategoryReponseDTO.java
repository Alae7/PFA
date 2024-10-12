package org.example.productmanagement.DTO.Category;



import lombok.*;




@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class CategoryReponseDTO {
	private Long id;
	private String name;
	private String image;
	private String pub;
}
