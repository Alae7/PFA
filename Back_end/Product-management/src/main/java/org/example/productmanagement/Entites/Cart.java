package org.example.productmanagement.Entites;

import jakarta.persistence.*;
import lombok.*;
import org.example.productmanagement.Model.User;


import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
@Table(name = "CART")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long idC;

    @ElementCollection
    @CollectionTable(name = "CART_PRODUCTS", joinColumns = @JoinColumn(name = "ID_Cart"))
    @Column(name = "ID_PRODUCT")
    private List<Long> idProductsqte;
    @Transient
    private Product_qte productQte;

    @Column(name = "AMONT")
    private Double amont;

}
