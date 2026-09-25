package com.marea.diarydbt.dto;

public record AuthResponse(
        String token,
        String utenteId,
        String username,
        String ruolo,
        String codicePaziente // null se terapeuta
) {}
