package com.marea.diarydbt.dto;

import jakarta.validation.constraints.NotBlank;

public record CollegaPazienteRequest(
        @NotBlank String codicePaziente
) {}
