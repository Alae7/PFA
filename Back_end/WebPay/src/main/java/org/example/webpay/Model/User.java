package org.example.webpay.Model;

import lombok.Data;

@Data
public class User {
    private Long id;
    private int idCart;
    private String fullName;
    private String email;
    private String address;
    private String phone;
    private String country;
    private String password;
    private String role;
    private String username;
}
