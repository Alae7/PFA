package org.example.productmanagement.DTO.Productqte;

import lombok.*;
import org.example.productmanagement.DTO.Product.ProductReponseDTO;


@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class ProductqteRequistDTO {
    Long idproduct;
    int qte;
}
