package com.marea.dto;

import jakarta.validation.constraints.NotBlank;

public record CollegaTerapeutaRequest(@NotBlank String codiceTerapeuta) {}
