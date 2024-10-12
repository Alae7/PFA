package org.example.productmanagement.Repository;


import org.example.productmanagement.Entites.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

import java.util.List;

@RepositoryRestController
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIdseller(Long ids);
    List<Product> findByIdcategory(Long idcategory);
}
