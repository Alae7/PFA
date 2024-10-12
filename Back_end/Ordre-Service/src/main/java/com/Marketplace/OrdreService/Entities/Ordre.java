package com.Marketplace.OrdreService.Entities;


import com.Marketplace.OrdreService.Model.Productqte;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "ORDRE")
public class Ordre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "ID")
    private Long id;

    @Column(name = "ID_USER")

    private Long idUser;

    @ElementCollection
    @CollectionTable(name = "ORDRE_PRODUCTS", joinColumns = @JoinColumn(name = "ORDRE_ID"))
    @Column(name = "PRODUCT_ID")
    private List<Long> productIds;
    @Transient
    private Productqte productqte;

    @Column(name = "ORDRE_DATE")
    private String OrdreDate;

    @Column(name = "AMOUNT")
    private Double amount;

    @Column(name = "STATUS")
    private Status status;
}
