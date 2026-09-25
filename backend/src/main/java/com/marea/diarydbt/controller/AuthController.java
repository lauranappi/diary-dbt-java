package com.marea.diarydbt.controller;

import com.marea.diarydbt.dto.AuthResponse;
import com.marea.diarydbt.dto.LoginRequest;
import com.marea.diarydbt.dto.RegistrazioneRequest;
import com.marea.diarydbt.service.AuthService;
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
