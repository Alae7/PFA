package com._3dsf.marketplace.users.bo.auth;

import com._3dsf.marketplace.users.bo.Role;
import lombok.Getter;

@Getter
public class RegisterRequest {

    private String fullName;
    private String email;
    private String address;
    private String phone;
    private String country;
    private String password;
}