package org.example.webpay.Model;

import lombok.Data;

@Data
public class Vente {

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
    StatusV status;
}
