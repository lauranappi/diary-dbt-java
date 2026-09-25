package com.marea.diarydbt.repository;

import com.marea.diarydbt.model.VoceDiario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface VoceDiarioRepository extends JpaRepository<VoceDiario, String> {
    Optional<VoceDiario> findByPazienteIdAndData(String pazienteId, LocalDate data);
    List<VoceDiario> findByPazienteIdOrderByDataDesc(String pazienteId);
    List<VoceDiario> findByPazienteIdAndDataBetweenOrderByDataDesc(String pazienteId, LocalDate da, LocalDate a);
}
