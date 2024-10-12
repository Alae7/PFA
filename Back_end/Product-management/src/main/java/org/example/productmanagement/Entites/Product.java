package org.example.productmanagement.Entites;

import jakarta.persistence.*;
import lombok.*;
import org.example.productmanagement.Model.Seller;


import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
@Table(name = "PRODUCT")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long idP;

    @Column(name = "ID_CATEGORY")
    private Long idcategory;
    @Transient
    private Category category;

    @Column(name = "ID_SELLER")
    private  Long idseller;
    @Transient
    private Seller seller;

    @Column(name = "NAME")
    private String name;

    @Column(name = "STOCK")
    private Integer stock;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "PRICE")
    private Double price;

    @Column(name = "DATE_CREATION")
    private String daTe_creation;

    @Column(name = "IMAGE")
    private String image;

    @Column(name = "IMAGE_Key")
    private String imageKey;
}
