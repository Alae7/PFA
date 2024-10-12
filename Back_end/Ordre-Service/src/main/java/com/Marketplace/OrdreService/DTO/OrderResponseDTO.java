package com.Marketplace.OrdreService.DTO;

import com.Marketplace.OrdreService.Entities.Status;
import com.Marketplace.OrdreService.Model.Product;
import com.Marketplace.OrdreService.Model.Productqte;
import com.Marketplace.OrdreService.Model.User;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class OrderResponseDTO {
    private Long idOrdre;
    private User user;
    private String date;
    private Double amount;
    private Status status;
    private List<Productqte> productqtes;
}
