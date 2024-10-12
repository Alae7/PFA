package org.example.productmanagement.Repository;

import org.example.productmanagement.Entites.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

import java.util.List;

@RepositoryRestController
public interface ReviewRepository extends JpaRepository<Review, Long> {
    public List<Review> findByIdProducts(Long product);
    public Review findByIdProductsAndIduser(Long product, Long userid);
}
