package com.marea.notifiche;

import com.marea.utente.Utente;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;

// Un telefono o browser che ha attivato i promemoria: contiene l'indirizzo
// del servizio push, le chiavi per cifrare il messaggio e l'orario scelto.
@Entity
@Table(name = "iscrizioni_push")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IscrizionePush {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "utente_id")
    private Utente utente;

    @Column(nullable = false, unique = true, length = 1000)
    private String endpoint;

    @Column(nullable = false)
    private String p256dh;

    @Column(nullable = false)
    private String auth;

    // Orario del promemoria, "HH:mm", nel fuso scelto dalla persona
    @Column(nullable = false, length = 5)
    private String ora;

    @Column(nullable = false, length = 64)
    private String fuso;

    @Column(nullable = false)
    private boolean attivo;

    // Giorno dell'ultimo promemoria inviato: evita di mandarne due nello stesso giorno
    private LocalDate ultimoInvio;

    private Instant creatoIl;
}
