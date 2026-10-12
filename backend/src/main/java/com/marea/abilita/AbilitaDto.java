package com.marea.abilita;

public record AbilitaDto(
        String id,
        String nome,
        String modulo // "mindfulness" | "tolleranza-sofferenza" | "regolazione-emozioni" | "efficacia-interpersonale"
) {}
