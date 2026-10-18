package com.marea.service;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;

// Ogni 5 minuti controlla chi deve ricevere il promemoria. Parte solo se le
// chiavi VAPID sono configurate (app.push.vapid-private).
@Component
@EnableScheduling
@ConditionalOnExpression("'${app.push.vapid-private:}' != ''")
@RequiredArgsConstructor
public class PromemoriaScheduler {

    private static final Logger log = LoggerFactory.getLogger(PromemoriaScheduler.class);

    private final PromemoriaService promemoriaService;

    @Scheduled(fixedDelayString = "${app.push.intervallo-ms:300000}", initialDelay = 60000)
    public void controlla() {
        var r = promemoriaService.invia(Instant.now());
        if (r.inviati() + r.rimossi() > 0) {
            log.info("Promemoria: inviati {}, saltati {}, rimossi {}", r.inviati(), r.saltati(), r.rimossi());
        }
    }
}
