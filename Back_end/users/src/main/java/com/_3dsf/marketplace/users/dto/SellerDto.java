package com._3dsf.marketplace.users.dto;

public record SellerDto (
        String businessName,
        String businessEmail,
        String businessAddress,
        String paypalEmail,
        Double sold
) {}
