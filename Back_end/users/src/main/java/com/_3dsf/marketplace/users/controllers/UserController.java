package com._3dsf.marketplace.users.controllers;

import com._3dsf.marketplace.users.bo.User;
import com._3dsf.marketplace.users.dto.UserDto;
import com._3dsf.marketplace.users.services.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
//@PreAuthorize("hasAuthority('USER')")
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {

    private final UserService userService;

    @GetMapping("/{idUser}")
    @Operation(
            summary = "Get user information"
    )
    public ResponseEntity<User> getUser(@PathVariable("idUser") Long idUser) {
        return ResponseEntity.ok(userService.getUserById(idUser));
    }

    @GetMapping("/{idUser}/cart")
    @Operation(
            summary = "Get the cart id of user"
    )
    public Long getUserCart(@PathVariable("idUser") Long idUser) {
        return userService.getUserCart(idUser);
    }

    @PutMapping("/{idUser}")
    @Operation(
            summary = "update user information"
    )
    public ResponseEntity<?> updateUser(@PathVariable("idUser") Long idUser,
                                        @RequestBody UserDto userDto) {
        userService.updateUser(idUser, userDto);
        return ResponseEntity.ok("User updated successfully");
    }
}
