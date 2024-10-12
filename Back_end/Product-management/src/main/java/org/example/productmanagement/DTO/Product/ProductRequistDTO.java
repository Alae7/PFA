package org.example.productmanagement.DTO.Product;


import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDate;
import java.util.Date;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class ProductRequistDTO {
	private Long idcategory;
	private Long idseller;
	private String name;
	private Integer stock;
	private String description;
	private Double price;
	private String daTe_creation;
	private MultipartFile image;
}
