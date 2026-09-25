package com.marea.diarydbt.service;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class AbilitaServiceTest {

    private final AbilitaService abilitaService = new AbilitaService();

    @Test
    void ilCatalogoContieneTuttiEQuattroIModuli() {
        var moduli = abilitaService.tutte().stream()
                .map(a -> a.modulo())
                .distinct()
                .toList();

        assertThat(moduli).containsExactlyInAnyOrder(
                "mindfulness", "tolleranza-sofferenza", "regolazione-emozioni", "efficacia-interpersonale");
    }

    @Test
    void ogniAbilitaHaUnIdUnivoco() {
        var ids = abilitaService.tutte().stream().map(a -> a.id()).distinct().toList();

        assertThat(ids).hasSameSizeAs(abilitaService.tutte());
    }

    @Test
    void ilCatalogoNonEVuoto() {
        assertThat(abilitaService.tutte()).isNotEmpty();
    }
}
