package com._3dsf.marketplace.users.config;

import com._3dsf.marketplace.users.clients.BearerTokenRequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class FeignClientConfig {

//    @Bean
    public BearerTokenRequestInterceptor bearerTokenRequestInterceptor() {
        return new BearerTokenRequestInterceptor();
    }
}
