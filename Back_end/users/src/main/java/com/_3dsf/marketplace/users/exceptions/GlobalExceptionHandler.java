package com._3dsf.marketplace.users.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFound(UserNotFoundException ex) {
        // Return a 404 status with the error message
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserAlreadySellerOrAdminException.class)
    public ResponseEntity<String> handleUserAlreadySellerOrAdmin(UserAlreadySellerOrAdminException ex) {
        // Return a 400 status with the error message
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SellerNotFoundException.class)
    public ResponseEntity<String> handleSellerNotFound(SellerNotFoundException ex) {
        // Return a 404 status with the error message
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(AdminNotFoundException.class)
    public ResponseEntity<String> handleAdminNotFound(AdminNotFoundException ex) {
        // Return a 404 status with the error message
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmailAlreadyUsedException.class)
    public ResponseEntity<String> handleEmailAlreadyUsed(EmailAlreadyUsedException ex) {
        // Return a 404 status with the error message
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        // Return a 500 status for other unhandled exceptions
        return new ResponseEntity<>("An unexpected error occurred: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}