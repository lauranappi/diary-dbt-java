package com.marea.controller;

import com.marea.dto.AuthResponse;
import com.marea.dto.LoginRequest;
import com.marea.dto.RegistrazioneRequest;
import com.marea.service.AuthService;

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
