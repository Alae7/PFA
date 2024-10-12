package com.Marketplace.OrdreService.Repository;

import com.Marketplace.OrdreService.Entities.Ordre;
import com.Marketplace.OrdreService.Entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdreRepository extends JpaRepository<Ordre, Long> {

    List<Ordre> findByIdUser(long idUser);
}
