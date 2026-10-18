package com.marea.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GestoreErrori {

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> gestisciArgomentoNonValido(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(Map.of("errore", e.getMessage()));
    }

    // 409: il documento e' stato modificato altrove; si restituisce la versione attuale
    @ExceptionHandler(ConflittoVersioneException.class)
    public ResponseEntity<Map<String, Object>> gestisciConflitto(ConflittoVersioneException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("errore", e.getMessage(), "attuale", e.getAttuale()));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>> gestisciAccessoNegato(AccessDeniedException e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("errore", e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> gestisciValidazione(MethodArgumentNotValidException e) {
        String messaggio = e.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining("; "));
        return ResponseEntity.badRequest().body(Map.of("errore", messaggio));
    }
}
