package com.marea.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Instant;
import java.util.Map;

// Un documento personale per utente e per chiave: impostazioni, post-it,
// preferiti, fogli compilati, note... Il contenuto e' un oggetto JSON libero,
// cosi' aggiungere una nuova sezione all'app non richiede una nuova tabella.
// "versione" serve a non sovrascrivere per sbaglio una modifica fatta da un
// altro dispositivo (controllo ottimistico).
@Entity
@Table(name = "documenti_utente", uniqueConstraints = @UniqueConstraint(columnNames = {"utente_id", "chiave"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DocumentoUtente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "utente_id")
    private Utente utente;

    @Column(nullable = false, length = 40)
    private String chiave;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> contenuto;

    @Column(nullable = false)
    private long versione;

    @Column(nullable = false)
    private Instant aggiornatoIl;
}
