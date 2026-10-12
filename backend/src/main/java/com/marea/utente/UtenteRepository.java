package com.marea.utente;

import com.marea.utente.Utente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UtenteRepository extends JpaRepository<Utente, String> {
    Optional<Utente> findByUsername(String username);
    Optional<Utente> findByCodicePaziente(String codicePaziente);
    List<Utente> findByTerapeutaId(String terapeutaId);
    boolean existsByUsername(String username);
    Optional<Utente> findByEmailIgnoreCase(String email);
    boolean existsByEmail(String email);
}
