package com.marea.auth;

import com.marea.auth.AuthResponse;
import com.marea.auth.LoginRequest;
import com.marea.auth.RegistrazioneRequest;
import com.marea.auth.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/registrati")
    public ResponseEntity<AuthResponse> registrati(@Valid @RequestBody RegistrazioneRequest req) {
        return ResponseEntity.ok(authService.registra(req));
    }

    @PostMapping("/accedi")
    public ResponseEntity<AuthResponse> accedi(@Valid @RequestBody LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }
}
