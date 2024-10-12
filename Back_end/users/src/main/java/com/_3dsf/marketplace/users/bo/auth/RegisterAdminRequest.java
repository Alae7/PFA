package com._3dsf.marketplace.users.bo.auth;

import lombok.Getter;

@Getter
public class RegisterAdminRequest extends RegisterRequest {

    private Boolean isPrincipal;
}