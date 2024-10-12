package com._3dsf.marketplace.users.exceptions;

public class UserAlreadySellerOrAdminException extends RuntimeException {
    public UserAlreadySellerOrAdminException(String message) {
        super(message);
    }
}