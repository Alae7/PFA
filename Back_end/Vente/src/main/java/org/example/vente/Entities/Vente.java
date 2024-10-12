package org.example.vente.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data

@Entity

public class Vente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long id;

    Long idSeller;
    Long idOrder;

    String nom_user;
     String phone_user;
    String adresse_user;
     String country_user;
    String product_name;
    Double price;
    int quantity;
    Status status;
}
