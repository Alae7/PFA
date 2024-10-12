package com._3dsf.marketplace.users.dto;

public record AdminDto(
    Long id,
    Boolean isPrinicipal,
    String fullName,
    String email,
    String address,
    String phone,
    String country,
    String password
) {}
