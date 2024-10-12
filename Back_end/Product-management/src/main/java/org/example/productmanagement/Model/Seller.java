package org.example.productmanagement.Model;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
public class Seller {
    private String businessName;
    // private String businessEmail;
    private String businessAddress;
    private String paypalEmail;
    private Double sold;
}
