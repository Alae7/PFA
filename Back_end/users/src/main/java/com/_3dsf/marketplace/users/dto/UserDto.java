package com._3dsf.marketplace.users.dto;

import jakarta.persistence.Column;

public record UserDto (
//    Long id,
    String fullName,
    String email,
    String address,
    String country,
    String phone,
    String password
) {}
