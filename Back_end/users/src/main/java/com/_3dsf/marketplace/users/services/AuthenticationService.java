package com._3dsf.marketplace.users.services;

import com._3dsf.marketplace.users.bo.Admin;
import com._3dsf.marketplace.users.bo.Seller;
import com._3dsf.marketplace.users.bo.auth.*;
import com._3dsf.marketplace.users.clients.ProductClient;
import com._3dsf.marketplace.users.config.JwtService;
import com._3dsf.marketplace.users.bo.Role;
import com._3dsf.marketplace.users.bo.User;
import com._3dsf.marketplace.users.dao.AdminRepository;
import com._3dsf.marketplace.users.dao.SellerRepository;
import com._3dsf.marketplace.users.dao.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final SellerRepository sellerRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenStorageService tokenService;
    private final JwtService jwtService;
    private final ProductClient productClient;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var jwtToken = jwtService.generateToken(user);
        tokenService.setAuthToken(jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().toString().toLowerCase())
                .build();
    }

    public AuthenticationResponse register(RegisterRequest request) {
        User user = User.builder()
                .fullName(request.getFullName())
                .idCart(productClient.addCart())
                .email(request.getEmail())
                .address(request.getAddress())
                .phone(request.getPhone())
                .country(request.getCountry())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        tokenService.setAuthToken(jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().toString().toLowerCase())
                .build();
    }

    public AuthenticationResponse registerAdmin(RegisterAdminRequest request) {
        Admin admin = new Admin();
        admin.setFullName(request.getFullName());
        admin.setIsPrincipal(request.getIsPrincipal());
        admin.setIdCart(productClient.addCart());
        admin.setEmail(request.getEmail());
        admin.setAddress(request.getAddress());
        admin.setPhone(request.getPhone());
        admin.setCountry(request.getCountry());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));

        adminRepository.save(admin);

        var jwtToken = jwtService.generateToken(admin);
        tokenService.setAuthToken(jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(admin.getId())
                .email(admin.getEmail())
                .fullName(admin.getFullName())
                .role(admin.getRole().toString().toLowerCase())
                .build();
    }

    public AuthenticationResponse registerSeller(RegisterSellerRequest request) {

        Seller seller = new Seller();
        seller.setFullName(request.getFullName());
        seller.setIdCart(productClient.addCart());
        seller.setEmail(request.getEmail());
        seller.setPhone(request.getPhone());
        seller.setAddress(request.getAddress());
        seller.setCountry(request.getCountry());
        seller.setPassword(passwordEncoder.encode(request.getPassword()));
        seller.setBusinessName(request.getBusinessName());
        seller.setBusinessEmail(request.getBusinessEmail());
        seller.setBusinessAddress(request.getBusinessAddress());
        seller.setPaypalEmail(request.getPaypalEmail());
        seller.setSold(0.0);

        sellerRepository.save(seller);

        var jwtToken = jwtService.generateToken(seller);
        tokenService.setAuthToken(jwtToken);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .id(seller.getId())
                .email(seller.getEmail())
                .fullName(seller.getFullName())
                .role(seller.getRole().toString().toLowerCase())
                .build();
    }
}
