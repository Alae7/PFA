package org.example.productmanagement.DTO.Productqte;

import lombok.*;
import org.example.productmanagement.DTO.Product.ProductReponseDTO;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ProductqteReponsDTO {
    private Long id;
    private ProductReponseDTO product;
    int qte;
}
