# Backend — diary-dbt

Spring Boot 3.4 / Java 21 / PostgreSQL / JWT.

## ⚠️ Non ancora compilato

Questo codice è stato scritto senza un ambiente Maven/Java disponibile per
verificarlo — a differenza del resto del progetto, non è stato testato con
una build vera prima di essere pubblicato. Prima di fidarsene, esegui:

```bash
mvn clean compile
```

e correggi quello che emerge.

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

## Cosa manca ancora

- Test automatici (nessuno scritto finora)
- Migrazioni database vere (oggi Hibernate genera lo schema da solo in
  sviluppo; in produzione andrebbe sostituito con Flyway o Liquibase)
- Endpoint per la gestione abilità/schede DBT, pianificazione attività,
  collegamento paziente-terapeuta lato terapeuta (solo login/registrazione
  e diario sono stati scritti finora)
