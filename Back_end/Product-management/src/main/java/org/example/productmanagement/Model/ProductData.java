package org.example.productmanagement.Model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
public class ProductData {
   private Long idcategory;
   private Long idseller;
   private String name;
   private Integer stock;
   private String description;
   private Double price;
   private String daTe_creation;
}
