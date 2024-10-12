package org.example.webpay.Model;


import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@ToString
public class Productqte {
    private Long id;
    private Product product;
    private int qte;
}

