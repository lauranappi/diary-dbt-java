package com.marea.diarydbt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.Instant;

@Entity
@Table(name = "utenti")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Ruolo ruolo;

    // Codice univoco che la paziente comunica alla terapeuta per collegarsi -
    // solo per utenti con ruolo PAZIENTE
    @Column(unique = true)
    private String codicePaziente;

    // Se questo utente e' una paziente collegata, riferimento alla terapeuta.
    // Il collegamento avviene DOPO la registrazione, quando la terapeuta
    // inserisce il codice che la paziente le ha comunicato a voce -
    // vedi TerapeutaService.collegaPaziente().
    @ManyToOne
    @JoinColumn(name = "terapeuta_id")
    private Utente terapeuta;

    // Quando e' avvenuto il collegamento con la terapeuta (null finche' non
    // e' collegata)
    private Instant collegataIl;

    private Instant creatoIl;

    public enum Ruolo {
        PAZIENTE, TERAPEUTA
    }
}
