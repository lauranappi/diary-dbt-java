package com.marea.diarydbt.service;

import com.marea.diarydbt.model.Utente;
import com.marea.diarydbt.repository.UtenteRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TerapeutaServiceTest {

    @Mock private UtenteRepository utenteRepository;

    @InjectMocks private TerapeutaService terapeutaService;

    @Test
    void collegaPazienteConCodiceValidoFunziona() {
        Utente terapeuta = Utente.builder().id("terapeuta-1").ruolo(Utente.Ruolo.TERAPEUTA).build();
        Utente paziente = Utente.builder().id("paziente-1").ruolo(Utente.Ruolo.PAZIENTE)
                .codicePaziente("ABC123").terapeuta(null).build();

        when(utenteRepository.findById("terapeuta-1")).thenReturn(Optional.of(terapeuta));
        when(utenteRepository.findByCodicePaziente("ABC123")).thenReturn(Optional.of(paziente));
        when(utenteRepository.save(any(Utente.class))).thenAnswer(inv -> inv.getArgument(0));

        Utente risultato = terapeutaService.collegaPaziente("terapeuta-1", "ABC123");

        assertThat(risultato.getTerapeuta()).isEqualTo(terapeuta);
        assertThat(risultato.getCollegataIl()).isNotNull();
    }

    @Test
    void collegaPazienteConCodiceInesistenteFallisce() {
        Utente terapeuta = Utente.builder().id("terapeuta-1").ruolo(Utente.Ruolo.TERAPEUTA).build();

        when(utenteRepository.findById("terapeuta-1")).thenReturn(Optional.of(terapeuta));
        when(utenteRepository.findByCodicePaziente("NONESISTE")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> terapeutaService.collegaPaziente("terapeuta-1", "NONESISTE"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Codice paziente non valido");
    }

    @Test
    void collegaPazienteGiaCollegataAdUnAltraTerapeutaFallisce() {
        Utente terapeuta = Utente.builder().id("terapeuta-1").ruolo(Utente.Ruolo.TERAPEUTA).build();
        Utente altraTerapeuta = Utente.builder().id("terapeuta-2").ruolo(Utente.Ruolo.TERAPEUTA).build();
        Utente paziente = Utente.builder().id("paziente-1").codicePaziente("ABC123")
                .terapeuta(altraTerapeuta).build();

        when(utenteRepository.findById("terapeuta-1")).thenReturn(Optional.of(terapeuta));
        when(utenteRepository.findByCodicePaziente("ABC123")).thenReturn(Optional.of(paziente));

        assertThatThrownBy(() -> terapeutaService.collegaPaziente("terapeuta-1", "ABC123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("già collegata");

        verify(utenteRepository, never()).save(any());
    }

    @Test
    void unaPazienteNonPuoCollegareAltrePazienti() {
        Utente nonTerapeuta = Utente.builder().id("utente-1").ruolo(Utente.Ruolo.PAZIENTE).build();
        when(utenteRepository.findById("utente-1")).thenReturn(Optional.of(nonTerapeuta));

        assertThatThrownBy(() -> terapeutaService.collegaPaziente("utente-1", "ABC123"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Solo una terapeuta");
    }

    @Test
    void mieiePazienteRestituisceSoloQuelleCollegate() {
        List<Utente> attese = List.of(
                Utente.builder().id("p1").build(),
                Utente.builder().id("p2").build()
        );
        when(utenteRepository.findByTerapeutaId("terapeuta-1")).thenReturn(attese);

        List<Utente> risultato = terapeutaService.mieiePazienti("terapeuta-1");

        assertThat(risultato).hasSize(2);
    }

    @Test
    void scollegaPazienteCollegataFunziona() {
        Utente terapeuta = Utente.builder().id("terapeuta-1").build();
        Utente paziente = Utente.builder().id("paziente-1").terapeuta(terapeuta).build();

        when(utenteRepository.findById("paziente-1")).thenReturn(Optional.of(paziente));
        when(utenteRepository.save(any(Utente.class))).thenAnswer(inv -> inv.getArgument(0));

        terapeutaService.scollegaPaziente("terapeuta-1", "paziente-1");

        verify(utenteRepository).save(argThat(p -> p.getTerapeuta() == null && p.getCollegataIl() == null));
    }

    @Test
    void scollegaPazienteNonCollegataAQuestaTerapeutaFallisce() {
        Utente altraTerapeuta = Utente.builder().id("terapeuta-2").build();
        Utente paziente = Utente.builder().id("paziente-1").terapeuta(altraTerapeuta).build();

        when(utenteRepository.findById("paziente-1")).thenReturn(Optional.of(paziente));

        assertThatThrownBy(() -> terapeutaService.scollegaPaziente("terapeuta-1", "paziente-1"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("non è collegata a te");
    }
}
