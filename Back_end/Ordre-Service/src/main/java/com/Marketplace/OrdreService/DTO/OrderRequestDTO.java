package com.Marketplace.OrdreService.DTO;


import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class OrderRequestDTO {

    private Long idUser;
    private String Ordre_date;

}
