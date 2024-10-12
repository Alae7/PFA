package com._3dsf.marketplace.users.bo.auth;

import jakarta.persistence.Column;
import lombok.Getter;

@Getter
public class RegisterSellerRequest extends RegisterRequest {

    private String businessName;
    private String businessEmail;
    private String businessAddress;
    private String paypalEmail;
//    private Double sold;
}