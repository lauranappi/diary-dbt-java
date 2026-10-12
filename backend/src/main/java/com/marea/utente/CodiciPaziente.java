package com.marea.utente;

import java.security.SecureRandom;
import java.util.function.Predicate;

// Genera il codice che la paziente comunica alla terapeuta (6 caratteri,
// senza lettere e numeri ambigui come 0/O e 1/I).
public final class CodiciPaziente {

    private static final String ALFABETO = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
    private static final SecureRandom RANDOM = new SecureRandom();

    private CodiciPaziente() {}

    public static String genera(Predicate<String> giaInUso) {
        String codice;
        do {
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 6; i++) {
                sb.append(ALFABETO.charAt(RANDOM.nextInt(ALFABETO.length())));
            }
            codice = sb.toString();
        } while (giaInUso.test(codice));
        return codice;
    }
}
