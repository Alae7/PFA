package org.example.productmanagement.Repository;

import org.example.productmanagement.Entites.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

@RepositoryRestController
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
