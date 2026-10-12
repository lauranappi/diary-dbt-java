package com.marea.documenti;

import java.util.Set;
import java.util.regex.Pattern;

// Elenco delle chiavi note e regole di visibilita'. Le chiavi "condivise"
// sono quelle che la terapeuta collegata puo' leggere; le altre (post-it,
// preferiti, impostazioni) sono private della paziente.
public final class ChiaviDocumento {

    public static final String NOTE_TERAPEUTA = "note-terapeuta";

    public static final Set<String> CONDIVISE = Set.of(
            "attivita-provate", "abilita-personali", "note-paziente", NOTE_TERAPEUTA, "fogli");

    private static final Pattern FORMA_VALIDA = Pattern.compile("[a-z0-9-]{1,40}");

    private ChiaviDocumento() {}

    public static boolean valida(String chiave) {
        return chiave != null && FORMA_VALIDA.matcher(chiave).matches();
    }
}
