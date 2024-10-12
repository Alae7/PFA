package com._3dsf.marketplace.users.dao;

import com._3dsf.marketplace.users.bo.Admin;
import com._3dsf.marketplace.users.bo.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Boolean existsByEmail(String email);
}
