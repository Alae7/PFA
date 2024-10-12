package com._3dsf.marketplace.users.dao;

import com._3dsf.marketplace.users.bo.Role;
import com._3dsf.marketplace.users.bo.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    List<User> findAllByRole(Role role);
}