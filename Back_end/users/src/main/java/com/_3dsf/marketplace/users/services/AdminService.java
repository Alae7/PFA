package com._3dsf.marketplace.users.services;

import com._3dsf.marketplace.users.bo.*;
import com._3dsf.marketplace.users.clients.ProductClient;
import com._3dsf.marketplace.users.dao.AdminRepository;
import com._3dsf.marketplace.users.dao.SellerRepository;
import com._3dsf.marketplace.users.dao.UserRepository;
import com._3dsf.marketplace.users.dto.AdminDto;
import com._3dsf.marketplace.users.dto.CategoryDto;
import com._3dsf.marketplace.users.exceptions.AdminNotFoundException;
import com._3dsf.marketplace.users.exceptions.EmailAlreadyUsedException;
import com._3dsf.marketplace.users.exceptions.SellerNotFoundException;
import com._3dsf.marketplace.users.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ProductClient productClient;

    public AdminService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    public Admin getAdminById(Long idAdmin) {
        return adminRepository.findById(idAdmin)
                .orElseThrow(() -> new AdminNotFoundException("Admin not found"));
    }

    public Boolean existsByEmail(String email) {
        return adminRepository.existsByEmail(email);
    }

    public void createAdmin(Admin admin) {
        adminRepository.save(admin);
    }

    public void updateAdmin(Long idAdmin, AdminDto adminDto) {

        Admin admin = getAdminById(idAdmin);

        if (adminDto.id() != null) {
            admin.setId(adminDto.id());
        }
        if (adminDto.isPrinicipal() != null) {
            admin.setIsPrincipal(adminDto.isPrinicipal());
        }
        if (adminDto.fullName() != null) {
            admin.setFullName(adminDto.fullName());
        }
        if (adminDto.email() != null) {
            if (existsByEmail(adminDto.email())) {
                throw new EmailAlreadyUsedException("This email is already used for another admin");
            }
            admin.setEmail(adminDto.email());
        }
        if (adminDto.country() != null) {
            admin.setCountry(adminDto.country());
        }
        if (adminDto.password() != null) {
            admin.setPassword(passwordEncoder.encode(adminDto.password()));
        }
        if (adminDto.address() != null) {
            admin.setAddress(adminDto.address());
        }
        if (adminDto.phone() != null) {
            admin.setPhone(adminDto.phone());
        }
        adminRepository.save(admin);
    }

    public void removeUser(Long idUser) {
        if (userRepository.existsById(idUser)) {
            userRepository.deleteById(idUser);
        } else {
            throw new UserNotFoundException(String.format("User with ID %d Not Found", idUser));
        }
    }

    public void removeSeller(Long idSeller) {
        if (sellerRepository.existsById(idSeller)) {
            sellerRepository.deleteById(idSeller);
        } else {
            throw new SellerNotFoundException(String.format("Seller with ID %d Not Found", idSeller));
        }
    }

    public void removeAdmin(Long idAdmin) {
        if (adminRepository.existsById(idAdmin)) {
            adminRepository.deleteById(idAdmin);
        } else {
            throw new AdminNotFoundException(String.format("Admin with ID %d Not Found", idAdmin));
        }
    }


    public User findOneUser(Long userId) {
        return userRepository.findById(userId).get();
    }


    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public List<User> listUsersOnly() {
        return userRepository.findAllByRole(Role.USER);
    }

    public List<Seller> listSellers() {
        return sellerRepository.findAll();
    }

    public List<Admin> listAdmins() {
        return adminRepository.findAll();
    }

    public void addCategory(CategoryDto categoryDto) {
        productClient.addCategory(categoryDto);
    }

    public void updateCategory(Long idCategory, CategoryDto categoryDto) {
        productClient.updateCategory(idCategory, categoryDto);
    }

    public void deleteCategory(Long idCategory) {
        productClient.deleteCategory(idCategory);
    }
}
