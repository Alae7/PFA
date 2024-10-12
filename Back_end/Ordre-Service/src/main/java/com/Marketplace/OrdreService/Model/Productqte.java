package com.Marketplace.OrdreService.Model;


import lombok.*;

import java.util.List;

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
