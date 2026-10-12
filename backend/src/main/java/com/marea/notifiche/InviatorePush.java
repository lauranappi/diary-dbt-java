package com.marea.notifiche;

// Confine verso il servizio push vero e proprio: tenerlo dietro un'interfaccia
// permette di provare la logica dei promemoria senza spedire nulla.
public interface InviatorePush {

    enum Esito { INVIATO, SCADUTA, ERRORE }

    Esito invia(IscrizionePush iscrizione, String messaggio);
}
