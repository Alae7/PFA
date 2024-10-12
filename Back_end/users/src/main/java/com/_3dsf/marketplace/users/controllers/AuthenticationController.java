package com._3dsf.marketplace.users.controllers;

import com._3dsf.marketplace.users.bo.auth.*;
import com._3dsf.marketplace.users.services.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com._3dsf.marketplace.users.bo.User;
import com._3dsf.marketplace.users.dao.UserRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication")
public class AuthenticationController {

    private final AuthenticationService authService;

    private final JavaMailSender mailSender;

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private Map<String, String> resetCodes = new HashMap<>();

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/registerAdmin")
    @Operation(
            summary = "register a new admin for Test"
    )
    public ResponseEntity<AuthenticationResponse> registerAdmin(
            @RequestBody RegisterAdminRequest request
    ) {
        return ResponseEntity.ok(authService.registerAdmin(request));
    }

    @PostMapping("/registerSeller")
    @Operation(
            summary = "register a new seller for Test"
    )
    public ResponseEntity<AuthenticationResponse> registerSeller(
            @RequestBody RegisterSellerRequest request
    ) {
        return ResponseEntity.ok(authService.registerSeller(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        // Clear the security context
        SecurityContextHolder.clearContext();

        // Optionally: Clear cookies or other client-side storage of the token

        return ResponseEntity.ok("Successfully logged out.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> sendResetCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Valider l'adresse email
        if (email == null || !isValidEmail(email)) {
            return ResponseEntity.badRequest().body("{\"success\": false, \"message\": \"Invalid email format\"}");
        }

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            // Générer un code de réinitialisation de 6 caractères
            String resetCode = UUID.randomUUID().toString().substring(0, 6);
            resetCodes.put(email, resetCode);

            // Envoyer le code de réinitialisation à l'utilisateur par email
            try {
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

                helper.setTo(email);
                helper.setSubject("Password Reset Code");

                // Message HTML avec le code de réinitialisation
                String htmlMsg = "<p>Hello,</p>"
                        + "<p>You requested to reset your password. Here is your reset code:</p>"
                        + "<h3><strong>" + resetCode + "</strong></h3>"
                        + "<p>Please use this code to reset your password.</p>"
                        + "<p>If you didn't request a password reset, you can ignore this email.</p>"
                        + "<p>Best regards,<br>VenteX Team</p>";

                helper.setText(htmlMsg, true); // Le paramètre 'true' indique que le message est au format HTML

                mailSender.send(mimeMessage);
            } catch (Exception e) {
                // Gestion des erreurs d'envoi de l'email
                return ResponseEntity.status(500).body("{\"success\": false, \"message\": \"Failed to send email\"}");
            }

            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Reset code sent to your email\"}");
        } else {
            return ResponseEntity.status(404).body("{\"success\": false, \"message\": \"User not found\"}");
        }
    }


    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    @PostMapping("/verify-reset-code")
    public ResponseEntity<?> verifyResetCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        if (resetCodes.containsKey(email) && resetCodes.get(email).equals(code)) {
            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Code verified\"}");
        } else {
            return ResponseEntity.status(400).body("{\"success\": false, \"message\": \"Invalid code\"}");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String newPassword = request.get("newPassword");

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return ResponseEntity.ok().body("{\"success\": true, \"message\": \"Password updated\"}");
        } else {
            return ResponseEntity.status(404).body("{\"success\": false, \"message\": \"User not found\"}");
        }
    }

}
