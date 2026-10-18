package com.marea.service;

import com.marea.model.IscrizionePush;
import com.marea.model.Utente;
import com.marea.repository.IscrizionePushRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PromemoriaServiceTest {

    // 12 ottobre 2026, 21:30 a Roma (UTC+2) = 19:30 UTC
    private static final Instant SERA = Instant.parse("2026-10-12T19:30:00Z");
    private static final LocalDate OGGI = LocalDate.of(2026, 10, 12);

    @Mock private IscrizionePushRepository iscrizioni;
    @Mock private DiarioService diarioService;
    @Mock private InviatorePush inviatore;

    private PromemoriaService servizio;
    private Utente utente;

    @BeforeEach
    void prepara() {
        servizio = new PromemoriaService(iscrizioni, diarioService, inviatore);
        utente = Utente.builder().id("u1").username("mara").build();
    }

    private IscrizionePush iscrizione(String ora, LocalDate ultimoInvio) {
        return IscrizionePush.builder().id("i1").utente(utente).endpoint("https://push/e")
                .p256dh("k").auth("a").ora(ora).fuso("Europe/Rome").attivo(true).ultimoInvio(ultimoInvio).build();
    }

    @Test
    void inviaQuandoLOrarioEPassatoENonHaCompilato() {
        var it = iscrizione("21:00", null);
        when(iscrizioni.findByAttivoTrue()).thenReturn(List.of(it));
        when(diarioService.haCompilato("u1", OGGI)).thenReturn(false);
        when(inviatore.invia(any(), any())).thenReturn(InviatorePush.Esito.INVIATO);

        var r = servizio.invia(SERA);

        assertEquals(1, r.inviati());
        assertEquals(OGGI, it.getUltimoInvio());
    }

    @Test
    void nonInviaPrimaDellOrario() {
        when(iscrizioni.findByAttivoTrue()).thenReturn(List.of(iscrizione("22:00", null)));
        assertEquals(1, servizio.invia(SERA).saltati());
        verifyNoInteractions(inviatore);
    }

    @Test
    void nonInviaDopoTreOre() {
        when(iscrizioni.findByAttivoTrue()).thenReturn(List.of(iscrizione("18:00", null)));
        assertEquals(1, servizio.invia(SERA).saltati());
        verifyNoInteractions(inviatore);
    }

    @Test
    void nonInviaDueVolteNelloStessoGiorno() {
        when(iscrizioni.findByAttivoTrue()).thenReturn(List.of(iscrizione("21:00", OGGI)));
        assertEquals(1, servizio.invia(SERA).saltati());
        verifyNoInteractions(inviatore);
    }

    @Test
    void nonInviaSeHaGiaCompilatoOggi() {
        when(iscrizioni.findByAttivoTrue()).thenReturn(List.of(iscrizione("21:00", null)));
        when(diarioService.haCompilato("u1", OGGI)).thenReturn(true);
        assertEquals(1, servizio.invia(SERA).saltati());
        verifyNoInteractions(inviatore);
    }

    @Test
    void rimuoveLIscrizioneScaduta() {
        var it = iscrizione("21:00", null);
        when(iscrizioni.findByAttivoTrue()).thenReturn(List.of(it));
        when(diarioService.haCompilato("u1", OGGI)).thenReturn(false);
        when(inviatore.invia(any(), any())).thenReturn(InviatorePush.Esito.SCADUTA);

        assertEquals(1, servizio.invia(SERA).rimossi());
        verify(iscrizioni).delete(it);
    }

    @Test
    void conUnErroreRiprovaAlControlloSuccessivo() {
        var it = iscrizione("21:00", null);
        when(iscrizioni.findByAttivoTrue()).thenReturn(List.of(it));
        when(diarioService.haCompilato("u1", OGGI)).thenReturn(false);
        when(inviatore.invia(any(), any())).thenReturn(InviatorePush.Esito.ERRORE);

        var r = servizio.invia(SERA);

        assertEquals(0, r.inviati());
        assertNull(it.getUltimoInvio());
    }
}
