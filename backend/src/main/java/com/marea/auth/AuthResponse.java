package com.marea.auth;

public record AuthResponse(
        String token,
        String utenteId,
        String username,
        String ruolo,
        String codicePaziente // null se terapeuta
) {}
