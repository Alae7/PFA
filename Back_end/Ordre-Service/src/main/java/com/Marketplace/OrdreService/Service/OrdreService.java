package com.Marketplace.OrdreService.Service;

import com.Marketplace.OrdreService.DTO.OrderRequestDTO;
import com.Marketplace.OrdreService.DTO.OrderResponseDTO;
import com.Marketplace.OrdreService.Entities.Status;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OrdreService {

     Long ADD(Long userid);

    OrderResponseDTO GetoneOrdre(Long id);

    void Update(Long ide, Status status);
    List<OrderResponseDTO> GetallOrdre(Long userid);

    List<OrderResponseDTO> GetallOrdreadmin();

    void delete(Long id);

    void updateUserordre(Long idUser , Long newidUser);


}
