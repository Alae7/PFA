package com._3dsf.marketplace.users.dto;

import java.time.LocalDate;

public record ProductDto (
    Long id,
    Long idSeller,
    Long idCategory,
    String name,
    String description,
    Double price,
    Integer stock,
    LocalDate creation_date,
    String image
) {}
