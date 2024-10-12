package com.Marketplace.OrdreService.Model;

import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@ToString
public class Product {
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
