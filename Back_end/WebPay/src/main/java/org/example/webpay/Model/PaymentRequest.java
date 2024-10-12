package org.example.webpay.Model;

import lombok.Data;

import java.util.List;

@Data
public class PaymentRequest {

    private Long idOrdre;
    private Double amount;
    private List<Productqte> productqtes;
}

