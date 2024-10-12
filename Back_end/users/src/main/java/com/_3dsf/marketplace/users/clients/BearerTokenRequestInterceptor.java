package com._3dsf.marketplace.users.clients;

import com._3dsf.marketplace.users.services.TokenStorageService;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class BearerTokenRequestInterceptor implements RequestInterceptor {

//    @Autowired
    private TokenStorageService tokenService;

    @Override
    public void apply(RequestTemplate template) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = userDetails.getUsername(); // Assuming username is used as userId
        String token = tokenService.getAuthToken();
        System.out.println("token from interceptor: " + token);

        if (token != null) {
            template.header("Authorization", "Bearer " + token);
        }
    }
}