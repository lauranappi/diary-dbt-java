package com.marea.utente;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ModificaProfiloRequest(
        @NotBlank @Size(max = 80) String nome,
        @Size(max = 80) String cognome
) {}
