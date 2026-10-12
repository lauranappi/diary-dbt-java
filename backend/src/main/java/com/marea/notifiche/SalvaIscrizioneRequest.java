package com.marea.notifiche;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record SalvaIscrizioneRequest(
        @NotBlank @Size(max = 1000) String endpoint,
        @NotBlank String p256dh,
        @NotBlank String auth,
        @NotBlank @Pattern(regexp = "([01]\\d|2[0-3]):[0-5]\\d", message = "orario non valido (HH:mm)") String ora,
        String fuso,
        boolean attivo
) {}
