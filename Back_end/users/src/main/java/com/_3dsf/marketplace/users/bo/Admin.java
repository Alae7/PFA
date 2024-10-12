package com._3dsf.marketplace.users.bo;

import jakarta.persistence.Entity;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.*;

@Data
//@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "idAdmin")
public class Admin extends User {

    private Boolean isPrincipal;

    @PrePersist
    public void assignRole() {
        setRole(Role.ADMIN);
    }
}