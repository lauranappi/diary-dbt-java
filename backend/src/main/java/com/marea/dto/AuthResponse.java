package com.marea.dto;

public record AuthResponse(
        String token,
        String utenteId,
        String username,
        String ruolo,
        String codicePaziente, // null se terapeuta
        String nome,
        String cognome,
        String codiceTerapeuta // username della terapeuta collegata, se c'e'
) {
    public AuthResponse(String token, String utenteId, String username, String ruolo, String codicePaziente) {
        this(token, utenteId, username, ruolo, codicePaziente, null, null, null);
    }
}
