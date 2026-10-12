package com.marea.terapeuta;

import jakarta.validation.constraints.NotBlank;

public record CollegaPazienteRequest(
        @NotBlank String codicePaziente
) {}
