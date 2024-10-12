package org.example.productmanagement.Repository;

import org.example.productmanagement.Entites.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface CartRepository extends JpaRepository<Cart, Long> {
}
