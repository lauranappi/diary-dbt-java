package com.marea.diarydbt.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.Map;

// Una voce per paziente per giorno. I campi variabili (scale, si/no, testi
// liberi, abilita' usate) restano come JSON invece di una tabella a parte:
// lo schema di questi campi cambia spesso (nuove scale, nuove abilita') e
// non vale la pena una migrazione ogni volta.
//
// @JdbcTypeCode(SqlTypes.JSON) e' il supporto JSON nativo di Hibernate 6:
// sceglie da solo il tipo di colonna giusto per ogni database (jsonb su
// PostgreSQL, un tipo compatibile su H2 usato nei test) - a differenza di
// un columnDefinition scritto a mano, che rompeva la creazione tabella su H2.
@Entity
@Table(name = "voci_diario", uniqueConstraints = @UniqueConstraint(columnNames = {"paziente_id", "data"}))
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VoceDiario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "paziente_id")
    private Utente paziente;

    @Column(nullable = false)
    private LocalDate data;

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Integer> scale; // es. {"ai": 3, "vg": 1, ...}

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, String> toggle; // es. {"farmaci": "Sì", ...}

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, String> testi; // note libere per sezione

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Boolean> abilitaUsate; // id abilita' -> usata si/no

    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String, Object> planner; // mattina/pomeriggio/sera -> attivita'
}
