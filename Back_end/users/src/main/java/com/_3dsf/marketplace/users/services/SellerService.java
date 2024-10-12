package com._3dsf.marketplace.users.services;

import com._3dsf.marketplace.users.bo.Admin;
import com._3dsf.marketplace.users.bo.Seller;
import com._3dsf.marketplace.users.bo.User;
import com._3dsf.marketplace.users.bo.auth.RegisterSellerRequest;
import com._3dsf.marketplace.users.dao.SellerRepository;
import com._3dsf.marketplace.users.dao.UserRepository;
import com._3dsf.marketplace.users.dto.ProductDto;
import com._3dsf.marketplace.users.clients.ProductClient;
import com._3dsf.marketplace.users.dto.SellerDto;
import com._3dsf.marketplace.users.exceptions.EmailAlreadyUsedException;
import com._3dsf.marketplace.users.exceptions.SellerNotFoundException;
import com._3dsf.marketplace.users.exceptions.UserAlreadySellerOrAdminException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.UUID;

@Service
public class SellerService {

    private final PasswordEncoder passwordEncoder;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private ProductClient productClient;

    public SellerService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public Seller getSellerById(Long sellerId) {
        return sellerRepository.findById(sellerId)
                .orElseThrow(() -> new SellerNotFoundException("Seller Not Found"));
    }


    public Long addSeller(@PathVariable("idUser") Long idUser,
                          @RequestBody SellerDto sellerDto) {
        // Find the existing user by ID
        User existingUser = userRepository.findById(idUser)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Check if the user is already a Seller or Admin
        if (existingUser instanceof Seller || existingUser instanceof Admin) {
            throw new UserAlreadySellerOrAdminException("User is already a seller or admin");
        }

        // Create a new Seller using User data
        Seller seller = mergeSeller(existingUser, sellerDto);

        // Save and return the new Seller ID
        sellerRepository.save(seller);
        userRepository.deleteById(existingUser.getId());

        return sellerRepository.findByPaypalEmail(sellerDto.paypalEmail()).getId();
    }

    private Seller mergeSeller(User existingUser, SellerDto sellerDto) {

        Seller seller = new Seller();
        seller.setId(existingUser.getId());
        seller.setFullName(existingUser.getFullName());
        seller.setIdCart(existingUser.getIdCart());
        seller.setEmail(existingUser.getEmail());
        seller.setAddress(existingUser.getAddress());
        seller.setPhone(existingUser.getPhone());
        seller.setCountry(existingUser.getCountry());
        seller.setPassword(existingUser.getPassword());
        seller.setIdCart(existingUser.getIdCart());

        // Set seller-specific fields
        seller.setBusinessName(sellerDto.businessName());
        seller.setBusinessEmail(sellerDto.businessEmail());
        seller.setBusinessAddress(sellerDto.businessAddress());
        seller.setPaypalEmail(sellerDto.paypalEmail());
        seller.setSold(0.0);

        // Replace and Free the unique fields  for the seller
        String fakeFullName = String.format("fake_%s", UUID.randomUUID());
        Long fakeIdCart = existingUser.getIdCart();
        String fakeEmail = String.format("fake_%s@gmail.com", UUID.randomUUID());
        existingUser.setFullName(fakeFullName);
        existingUser.setIdCart(fakeIdCart);
        existingUser.setEmail(fakeEmail);
        userRepository.save(existingUser);

        return seller;
    }

    public void updateSeller(Long idSeller, RegisterSellerRequest sellerDto) {

        Seller seller = getSellerById(idSeller);

        if (sellerDto.getFullName() != null) {
            seller.setFullName(sellerDto.getFullName());
        }
        if (sellerDto.getEmail() != null) {
            seller.setEmail(sellerDto.getEmail());
        }
        if (sellerDto.getAddress() != null) {
            seller.setAddress(sellerDto.getAddress());
        }
        if (sellerDto.getPhone() != null) {
            seller.setPhone(sellerDto.getPhone());
        }
        if (sellerDto.getCountry() != null) {
            seller.setCountry(sellerDto.getCountry());
        }
        if (sellerDto.getPassword() != null) {
            seller.setPassword(passwordEncoder.encode(sellerDto.getPassword()));
        }
        if (sellerDto.getBusinessAddress() != null) {
            seller.setBusinessName(sellerDto.getBusinessName());
        }
        if (sellerDto.getBusinessAddress() != null) {
            seller.setBusinessAddress(sellerDto.getBusinessAddress());
        }
        if (sellerDto.getBusinessEmail() != null) {
            if (sellerRepository.existsByBusinessEmail(sellerDto.getBusinessEmail())) {
                throw new EmailAlreadyUsedException("This business email already used by another seller");
            }
            seller.setBusinessEmail(sellerDto.getBusinessEmail());
        }
        if (sellerDto.getPaypalEmail() != null) {
            seller.setPaypalEmail(sellerDto.getPaypalEmail());
        }

        sellerRepository.save(seller);
    }

    public Double getSellerSold(Long idSeller) {
        Seller seller = sellerRepository.findById(idSeller).
                orElseThrow(() -> new SellerNotFoundException("Seller Not Found"));

        return seller.getSold();
    }

    public void increaseSellerSold(Long idSeller, Double amount) {
        Seller seller = getSellerById(idSeller);
        seller.setSold(seller.getSold() + amount);
        sellerRepository.save(seller);
    }

    public void decreaseSellerSold(Long idSeller, Double amount) {
        Seller seller = getSellerById(idSeller);
        seller.setSold(seller.getSold() - amount);
        sellerRepository.save(seller);
    }

    public List<ProductDto> getProductsBySellerId(Long idSeller) {
        return productClient.getProductsBySeller(idSeller);
    }

    public void addProduct(ProductDto product) {
        productClient.addProduct(product);
    }

    public void updateProduct(Long productId, ProductDto product) {
        productClient.updateProduct(productId, product);
    }

    public void removeProduct(Long productId) {
        productClient.deleteProduct(productId);
    }
}
