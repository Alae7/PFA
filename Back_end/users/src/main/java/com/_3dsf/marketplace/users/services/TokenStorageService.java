package com._3dsf.marketplace.users.services;

import org.springframework.stereotype.Service;

@Service
public class TokenStorageService {

    private String authToken;

    public void setAuthToken(String token) {
        this.authToken = token;
    }

    public String getAuthToken() {
        return authToken;
    }
}
