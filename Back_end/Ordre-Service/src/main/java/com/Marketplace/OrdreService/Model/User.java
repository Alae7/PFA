package com.Marketplace.OrdreService.Model;

import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Setter
public class User {
    private Long id;
    private Long idCart;
    private String fullName;
    private String email;
    private String phone;
    private String country;
    private String address;

    private String password;
    private boolean looked;
    private String role;
}

