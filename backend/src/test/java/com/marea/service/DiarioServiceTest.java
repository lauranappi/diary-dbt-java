package com.marea.service;

import com.marea.dto.VoceDiarioDto;
import com.marea.model.Utente;
import com.marea.model.VoceDiario;
import com.marea.repository.UtenteRepository;
import com.marea.repository.VoceDiarioRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DiarioServiceTest {

    @Mock private VoceDiarioRepository voceDiarioRepository;
    @Mock private UtenteRepository utenteRepository;

    @InjectMocks private DiarioService diarioService;

    @Test
    void salvaCreaNuovaVoceSeNonEsisteGiaPerQuelGiorno() {
        LocalDate oggi = LocalDate.now();
        VoceDiarioDto dto = new VoceDiarioDto(oggi, Map.of("ai", 3), Map.of("farmaci", "Sì"),
                Map.of(), Map.of("respiro", true), Map.of());

        Utente paziente = Utente.builder().id("paziente-1").build();

        when(voceDiarioRepository.findByPazienteIdAndData("paziente-1", oggi)).thenReturn(Optional.empty());
        when(utenteRepository.getReferenceById("paziente-1")).thenReturn(paziente);
        when(voceDiarioRepository.save(any(VoceDiario.class))).thenAnswer(inv -> inv.getArgument(0));

        VoceDiario risultato = diarioService.salva("paziente-1", dto);

        assertThat(risultato.getData()).isEqualTo(oggi);
        assertThat(risultato.getScale()).containsEntry("ai", 3);
        assertThat(risultato.getPaziente()).isEqualTo(paziente);
    }

    @Test
    void salvaAggiornaVoceEsistenteInvecediCrearneUnaSeconda() {
        LocalDate oggi = LocalDate.now();
        VoceDiario esistente = VoceDiario.builder().id("voce-1").data(oggi).build();
        VoceDiarioDto dto = new VoceDiarioDto(oggi, Map.of("ai", 5), Map.of(), Map.of(), Map.of(), Map.of());

        when(voceDiarioRepository.findByPazienteIdAndData("paziente-1", oggi)).thenReturn(Optional.of(esistente));
        when(voceDiarioRepository.save(any(VoceDiario.class))).thenAnswer(inv -> inv.getArgument(0));

        VoceDiario risultato = diarioService.salva("paziente-1", dto);

        assertThat(risultato.getId()).isEqualTo("voce-1"); // stessa voce, non una nuova
        assertThat(risultato.getScale()).containsEntry("ai", 5);
        verify(utenteRepository, never()).getReferenceById(any()); // non serve, la voce esiste gia'
    }

    @Test
    void salvareSoloLeScaleNonCancellaAbilitaEPlanner() {
        LocalDate oggi = LocalDate.now();
        VoceDiario esistente = VoceDiario.builder().id("voce-1").data(oggi)
                .scale(Map.of("ai", 1)).abilitaUsate(Map.of("dear", true))
                .planner(Map.of("mattina", List.of("corsa"))).build();
        VoceDiarioDto dto = new VoceDiarioDto(oggi, Map.of("ai", 4), Map.of(), Map.of(), null, null);

        when(voceDiarioRepository.findByPazienteIdAndData("paziente-1", oggi)).thenReturn(Optional.of(esistente));
        when(voceDiarioRepository.save(any(VoceDiario.class))).thenAnswer(inv -> inv.getArgument(0));

        VoceDiario risultato = diarioService.salva("paziente-1", dto);

        assertThat(risultato.getScale()).containsEntry("ai", 4);
        assertThat(risultato.getAbilitaUsate()).containsEntry("dear", true);
        assertThat(risultato.getPlanner()).containsKey("mattina");
    }

    @Test
    void unaParteInviataVuotaSvuotaQuellaParte() {
        LocalDate oggi = LocalDate.now();
        VoceDiario esistente = VoceDiario.builder().id("voce-1").data(oggi).scale(Map.of("ai", 3)).build();
        VoceDiarioDto dto = new VoceDiarioDto(oggi, Map.of(), null, null, null, null);

        when(voceDiarioRepository.findByPazienteIdAndData("paziente-1", oggi)).thenReturn(Optional.of(esistente));
        when(voceDiarioRepository.save(any(VoceDiario.class))).thenAnswer(inv -> inv.getArgument(0));

        assertThat(diarioService.salva("paziente-1", dto).getScale()).isEmpty();
    }

    @Test
    void storicoRestituisceLeVociNellIntervallo() {
        LocalDate da = LocalDate.now().minusDays(7);
        LocalDate a = LocalDate.now();
        List<VoceDiario> vociAttese = List.of(VoceDiario.builder().id("v1").build());

        when(voceDiarioRepository.findByPazienteIdAndDataBetweenOrderByDataDesc("paziente-1", da, a))
                .thenReturn(vociAttese);

        List<VoceDiario> risultato = diarioService.storico("paziente-1", da, a);

        assertThat(risultato).isEqualTo(vociAttese);
    }

    @Test
    void terapeutaCollegataPuoLeggereLoStoricoDellaPaziente() {
        LocalDate da = LocalDate.now().minusDays(7);
        LocalDate a = LocalDate.now();
        Utente terapeuta = Utente.builder().id("terapeuta-1").build();
        Utente paziente = Utente.builder().id("paziente-1").terapeuta(terapeuta).build();

        when(utenteRepository.findById("paziente-1")).thenReturn(Optional.of(paziente));
        when(voceDiarioRepository.findByPazienteIdAndDataBetweenOrderByDataDesc("paziente-1", da, a))
                .thenReturn(List.of());

        // non deve lanciare eccezioni
        diarioService.storicoComeTerapeuta("terapeuta-1", "paziente-1", da, a);

        verify(voceDiarioRepository).findByPazienteIdAndDataBetweenOrderByDataDesc("paziente-1", da, a);
    }

    @Test
    void terapeutaNonCollegataNonPuoLeggereLoStoricoDellaPaziente() {
        LocalDate da = LocalDate.now().minusDays(7);
        LocalDate a = LocalDate.now();
        Utente altraTerapeuta = Utente.builder().id("terapeuta-2").build();
        Utente paziente = Utente.builder().id("paziente-1").terapeuta(altraTerapeuta).build();

        when(utenteRepository.findById("paziente-1")).thenReturn(Optional.of(paziente));

        assertThatThrownBy(() -> diarioService.storicoComeTerapeuta("terapeuta-1", "paziente-1", da, a))
                .isInstanceOf(AccessDeniedException.class)
                .hasMessageContaining("Non sei collegata");

        verify(voceDiarioRepository, never()).findByPazienteIdAndDataBetweenOrderByDataDesc(any(), any(), any());
    }

    @Test
    void terapeutaNonPuoLeggereStoricoDiPazienteSenzaTerapeutaAssegnata() {
        LocalDate da = LocalDate.now().minusDays(7);
        LocalDate a = LocalDate.now();
        Utente pazienteSenzaTerapeuta = Utente.builder().id("paziente-1").terapeuta(null).build();

        when(utenteRepository.findById("paziente-1")).thenReturn(Optional.of(pazienteSenzaTerapeuta));

        assertThatThrownBy(() -> diarioService.storicoComeTerapeuta("terapeuta-1", "paziente-1", da, a))
                .isInstanceOf(AccessDeniedException.class);
    }

    @Test
    void storicoComeTerapeutaConPazienteInesistenteFallisce() {
        when(utenteRepository.findById("paziente-fantasma")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> diarioService.storicoComeTerapeuta(
                "terapeuta-1", "paziente-fantasma", LocalDate.now(), LocalDate.now()))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("non trovata");
    }
}
