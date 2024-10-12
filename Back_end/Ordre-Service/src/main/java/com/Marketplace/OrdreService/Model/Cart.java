package com.Marketplace.OrdreService.Model;


import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Setter
@ToString

public class Cart {
    private Long id;
    private List<Productqte> productQteList;
    private Double amont;
}
