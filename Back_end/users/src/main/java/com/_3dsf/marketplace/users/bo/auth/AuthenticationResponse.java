package com._3dsf.marketplace.users.bo.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    private Long id;
    private String fullName;
    private String email;
    private String role;
    private String token;
}