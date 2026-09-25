package com.marea.diarydbt.model;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.hibernate.annotations.Type;

import java.time.LocalDate;
import java.util.Map;

// Una voce per paziente per giorno. I campi variabili (scale, si/no, testi
// liberi, abilita' usate) restano come JSON invece di una tabella a parte:
// lo schema di questi campi cambia spesso (nuove scale, nuove abilita') e
// non vale la pena una migrazione ogni volta.
//
// Nota: niente columnDefinition="jsonb" esplicito - lascia che Hibernate/
// Hypersistence scelgano il tipo colonna giusto per ogni database (jsonb
// vero su PostgreSQL, un CLOB su H2 usato nei test). Fissarlo a "jsonb"
// rompeva la creazione della tabella su H2, che quel tipo non lo conosce.
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

    @Type(JsonType.class)
    private Map<String, Integer> scale; // es. {"ai": 3, "vg": 1, ...}

    @Type(JsonType.class)
    private Map<String, String> toggle; // es. {"farmaci": "Sì", ...}

    @Type(JsonType.class)
    private Map<String, String> testi; // note libere per sezione

    @Type(JsonType.class)
    private Map<String, Boolean> abilitaUsate; // id abilita' -> usata si/no

    @Type(JsonType.class)
    private Map<String, Object> planner; // mattina/pomeriggio/sera -> attivita'
}
