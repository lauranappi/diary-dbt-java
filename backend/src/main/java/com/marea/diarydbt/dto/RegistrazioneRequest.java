package com.marea.diarydbt.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegistrazioneRequest(
        @NotBlank String username,
        @NotBlank @Size(min = 8, message = "La password deve avere almeno 8 caratteri") String password,
        @NotBlank String ruolo, // "PAZIENTE" o "TERAPEUTA"
        String codiceTerapeuta  // solo se ruolo = PAZIENTE, per collegarsi a una terapeuta
) {}
