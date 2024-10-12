package org.example.productmanagement.DTO.Product;



import lombok.*;



import java.time.LocalDate;


@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class ProductReponseDTO {
	private Long idProduct;
	private Long idcategory;
	private Long idseller;
	private String name;
	private Integer stock;
	private String description;
	private Double price;
	private String daTe_creation;
	private String image;
}
