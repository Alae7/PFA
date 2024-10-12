package org.example.productmanagement.Entites;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
public class Product_qte {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "ID_product")
    private Long idproduct;
    @Transient
    private Product product;

    @Column(name = "QTE")
    private Integer qte;
}
