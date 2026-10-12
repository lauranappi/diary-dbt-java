package com.marea.terapeuta;

import jakarta.validation.constraints.NotBlank;

public record CollegaTerapeutaRequest(@NotBlank String codiceTerapeuta) {}
