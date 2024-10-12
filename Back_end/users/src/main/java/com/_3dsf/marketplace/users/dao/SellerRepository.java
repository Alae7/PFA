package com._3dsf.marketplace.users.dao;

import com._3dsf.marketplace.users.bo.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    Boolean existsByBusinessEmail(String businessEmail);
    Seller findByPaypalEmail(String email);
}
