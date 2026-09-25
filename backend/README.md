# Backend — diary-dbt

Spring Boot 3.4 / Java 21 / PostgreSQL / JWT.

## Stato

✅ Compila ed esegue tutti i 36 test (`mvn test`), verificato per davvero
in locale con IntelliJ — non solo scritto a fiducia. Vedi la cronologia dei
commit per i problemi reali incontrati e come sono stati risolti (Lombok e
JDK troppo recente, tipo colonna JSON non riconosciuto da H2, entità JPA
serializzata direttamente invece di passare per un DTO).

**Importante**: usa Java 21 per compilare, non versioni più recenti (26 e
successive hanno rotto Lombok durante lo sviluppo — problema noto, non
ancora risolto lato Lombok all'uscita di nuove versioni principali di Java).

## Sviluppo locale

Il profilo `dev` (attivo di default) usa un database H2 in memoria — nessuna
installazione di PostgreSQL necessaria per iniziare:

```bash
mvn spring-boot:run
```

L'app parte su `http://localhost:8080`. Console H2 su `/h2-console`
(JDBC URL: `jdbc:h2:mem:diarydbt`, utente `sa`, password vuota).

## Produzione

Servono queste variabili d'ambiente (fornite dal servizio di hosting):
- `SPRING_PROFILES_ACTIVE=prod`
- `DATABASE_URL`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` — PostgreSQL vero
- `JWT_SECRET` — stringa lunga e casuale, diversa da quella di sviluppo
- `APP_CORS_ORIGIN` — dominio del frontend (es. `https://lauranappi.github.io`)

## Test

Tutti verificati e verdi:
- `JwtServiceTest`: generazione/validazione token, scadenza, manomissione
- `AuthServiceTest`: registrazione (con/senza terapeuta collegata, username
  duplicato, codice terapeuta non valido), accesso (credenziali giuste/sbagliate)
- `DiarioServiceTest`: salvataggio (nuova voce vs aggiornamento), lettura
  storico, controllo di accesso terapeuta-paziente (una terapeuta non
  collegata non può leggere i dati di una paziente)
- `AuthControllerTest` / `SicurezzaJwtIntegrationTest`: gli stessi percorsi
  ma end-to-end, con richieste HTTP vere contro un database H2 vero,
  compresa la sicurezza JWT

```bash
mvn test
```

## Cosa manca ancora

- Migrazioni database vere (oggi Hibernate genera lo schema da solo in
  sviluppo; in produzione andrebbe sostituito con Flyway o Liquibase)
- Endpoint per la gestione abilità/schede DBT e pianificazione attività
  (login/registrazione, diario e collegamento paziente-terapeuta sono
  fatti; il collegamento avviene come nell'app originale - la paziente
  riceve un codice alla registrazione e lo comunica a voce alla terapeuta,
  che poi lo usa per collegarsi da `POST /api/terapeuta/pazienti`)
