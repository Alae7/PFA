package org.example.productmanagement.Model;

import lombok.*;

import java.util.List;


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
    private String address;
    private String phone;
    private String country;
    private String password;
    private boolean looked;
    private String role;
}

