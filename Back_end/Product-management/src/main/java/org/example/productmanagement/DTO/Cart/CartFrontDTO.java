package org.example.productmanagement.DTO.Cart;


import lombok.*;
import org.example.productmanagement.Entites.Product_qte;

import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class CartFrontDTO {
	private Long id;
	private  List<Product_qte> productQteList;
	private Double amont;
}
