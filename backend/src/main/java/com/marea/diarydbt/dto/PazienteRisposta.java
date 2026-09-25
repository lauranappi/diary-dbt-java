package com.marea.diarydbt.dto;

import java.time.Instant;

public record PazienteRisposta(
        String id,
        String username,
        Instant collegataIl
) {}
