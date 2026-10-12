package com.marea.documenti;

import lombok.Getter;

// Il documento sul server e' piu' recente di quello da cui parte la modifica:
// l'app deve rileggerlo, unire le modifiche e riprovare.
@Getter
public class ConflittoVersioneException extends RuntimeException {

    private final transient DocumentoRisposta attuale;

    public ConflittoVersioneException(DocumentoRisposta attuale) {
        super("Il documento è stato modificato altrove");
        this.attuale = attuale;
    }
}
