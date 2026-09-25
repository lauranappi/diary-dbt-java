package com.marea.diarydbt.dto;

import java.time.LocalDate;
import java.util.Map;

public record VoceDiarioDto(
        LocalDate data,
        Map<String, Integer> scale,
        Map<String, String> toggle,
        Map<String, String> testi,
        Map<String, Boolean> abilitaUsate,
        Map<String, Object> planner
) {}
