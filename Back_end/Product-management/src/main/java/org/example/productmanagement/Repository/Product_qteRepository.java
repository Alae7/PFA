package org.example.productmanagement.Repository;

import org.example.productmanagement.Entites.Product_qte;
import org.example.productmanagement.Entites.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface Product_qteRepository extends JpaRepository<Product_qte, Long> {
    Product_qte findByIdproduct(Long idproduct);
    Boolean existsProduct_qteByIdproduct(Long idproduct );
}
