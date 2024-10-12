package com._3dsf.marketplace.users.bo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "idSeller")
public class Seller extends User {

    @Column(unique = true, nullable = false)
    private String businessName;
    @Column(unique = true, nullable = false)
    private String businessEmail;
    private String businessAddress;
    @Column(unique = true, nullable = false)
    private String paypalEmail;
    private Double sold;

    @PrePersist
    public void assignRole() {
        setRole(Role.SELLER);
    }
}