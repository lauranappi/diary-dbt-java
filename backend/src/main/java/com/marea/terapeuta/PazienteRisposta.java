package com.marea.terapeuta;

import java.time.Instant;

public record PazienteRisposta(
        String id,
        String username,
        Instant collegataIl
) {}
