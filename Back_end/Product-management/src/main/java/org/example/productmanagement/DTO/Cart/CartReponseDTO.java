package org.example.productmanagement.DTO.Cart;



import lombok.*;
import org.example.productmanagement.Entites.Product_qte;
import org.example.productmanagement.Model.User;


import java.util.List;

@Data @AllArgsConstructor @NoArgsConstructor @ToString @Builder
public class CartReponseDTO {
	private Long id;
	private  List<Product_qte> productQteList;
	private Double amont;
}
