package com.Marketplace.OrdreService.Mapper;

import com.Marketplace.OrdreService.DTO.OrderRequestDTO;
import com.Marketplace.OrdreService.DTO.OrderResponseDTO;
import com.Marketplace.OrdreService.Entities.Ordre;

public interface OrdreMapInter {
    Ordre FromRequist2Ordre(Long userid);
    OrderResponseDTO FromOrdre2Reponse(Ordre ordre);
}
