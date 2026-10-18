package com.marea.service;

import com.marea.model.IscrizionePush;

import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.GeneralSecurityException;
import java.security.Security;

@Component
public class WebPushInviatore implements InviatorePush {

    private static final Logger log = LoggerFactory.getLogger(WebPushInviatore.class);

    // null se le chiavi VAPID non sono configurate: in quel caso non si invia nulla
    private final PushService pushService;

    public WebPushInviatore(@Value("${app.push.vapid-public:}") String chiavePubblica,
                            @Value("${app.push.vapid-private:}") String chiavePrivata,
                            @Value("${app.push.subject:mailto:marea@example.com}") String soggetto)
            throws GeneralSecurityException {
        if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
            Security.addProvider(new BouncyCastleProvider());
        }
        boolean configurato = !chiavePubblica.isBlank() && !chiavePrivata.isBlank();
        this.pushService = configurato ? new PushService(chiavePubblica, chiavePrivata, soggetto) : null;
    }

    @Override
    public Esito invia(IscrizionePush iscrizione, String messaggio) {
        if (pushService == null) {
            log.warn("Chiavi VAPID non configurate: promemoria non inviato");
            return Esito.ERRORE;
        }
        try {
            Notification notifica = new Notification(
                    iscrizione.getEndpoint(), iscrizione.getP256dh(), iscrizione.getAuth(), messaggio);
            int codice = pushService.send(notifica).getStatusLine().getStatusCode();
            if (codice == 404 || codice == 410) return Esito.SCADUTA;
            if (codice >= 200 && codice < 300) return Esito.INVIATO;
            log.warn("Il servizio push ha risposto {}", codice);
            return Esito.ERRORE;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return Esito.ERRORE;
        } catch (Exception e) {
            log.warn("Invio push fallito: {}", e.getMessage());
            return Esito.ERRORE;
        }
    }
}
