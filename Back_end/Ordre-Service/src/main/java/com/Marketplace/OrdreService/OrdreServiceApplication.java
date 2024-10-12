package com.Marketplace.OrdreService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class OrdreServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrdreServiceApplication.class, args);
	}

}
