package com.marea.repository;

import com.marea.model.DocumentoUtente;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentoRepository extends JpaRepository<DocumentoUtente, String> {
    Optional<DocumentoUtente> findByUtenteIdAndChiave(String utenteId, String chiave);
    List<DocumentoUtente> findByUtenteId(String utenteId);
}
