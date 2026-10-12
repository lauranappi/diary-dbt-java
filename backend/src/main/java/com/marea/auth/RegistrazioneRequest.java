package com.marea.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistrazioneRequest(
        @NotBlank String username,
        @NotBlank @Size(min = 8, message = "La password deve avere almeno 8 caratteri") String password,
        @NotBlank String ruolo, // "PAZIENTE" o "TERAPEUTA"
        String nome,
        String cognome,
        @Email String email,
        String codiceTerapeuta // facoltativo: username della terapeuta, come in Marea
) {
    public RegistrazioneRequest(String username, String password, String ruolo) {
        this(username, password, ruolo, null, null, null, null);
    }
}
