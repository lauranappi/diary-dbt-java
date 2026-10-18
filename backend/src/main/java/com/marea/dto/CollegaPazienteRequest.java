package com.marea.dto;

import jakarta.validation.constraints.NotBlank;

public record CollegaPazienteRequest(
        @NotBlank String codicePaziente
) {}
