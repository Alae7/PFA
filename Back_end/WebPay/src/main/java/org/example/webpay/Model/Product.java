package org.example.webpay.Model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@ToString
public class Product {
    private Long idProduct;
    private Long category;
    private Long idseller;
    private String name;
    private Integer stock;
    private String description;
    private Double price;
    private String daTe_creation;
    private String image;
}
