package com.marea.documenti;

import jakarta.validation.constraints.NotNull;

import java.util.Map;

// versioneBase: la versione da cui parte la modifica (0 se il documento non
// esiste ancora sul dispositivo).
public record SalvaDocumentoRequest(@NotNull Map<String, Object> contenuto, long versioneBase) {}
