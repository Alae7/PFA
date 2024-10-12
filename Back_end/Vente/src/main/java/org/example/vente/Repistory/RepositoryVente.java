package org.example.vente.Repistory;

import org.example.vente.Entities.Vente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RepositoryVente extends JpaRepository<Vente, Long> {

    List<Vente> findByIdSeller(Long idSeller);

}
