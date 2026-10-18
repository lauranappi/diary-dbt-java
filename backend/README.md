# Backend — Marea

Spring Boot 3.4 / Java 21 / PostgreSQL / JWT.

## Stato

✅ Compila ed esegue tutti i 40 test (`mvn test`), verificato per davvero
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
(JDBC URL: `jdbc:h2:mem:marea`, utente `sa`, password vuota).

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
- Tutti gli endpoint principali sono scritti: autenticazione, diario
  (con la pianificazione attività inclusa nel campo `planner`), catalogo
  abilità DBT, collegamento paziente-terapeuta

## Struttura (a livelli)

`controller`, `service`, `repository`, `model`, `dto`, `config`, `exception`, `util` (vedi `ARCHITETTURA.md`).

## Nuovi endpoint (Fase 1)

| Metodo | Percorso | Cosa fa |
|--------|----------|---------|
| GET | `/api/documenti` | tutti i documenti personali |
| GET/PUT/DELETE | `/api/documenti/{chiave}` | un documento (impostazioni, post-it, preferiti, fogli…) — il PUT richiede `versioneBase`, se è cambiato altrove risponde 409 con la versione attuale |
| GET | `/api/terapeuta/pazienti/{id}/documenti` | la terapeuta legge i documenti *condivisi* della paziente collegata |
| PUT | `/api/terapeuta/pazienti/{id}/documenti/note-terapeuta` | la terapeuta scrive le sue note |
| PUT/DELETE | `/api/paziente/terapeuta` | la paziente indica/toglie la propria terapeuta (codice = username) |
| GET | `/api/notifiche/chiave-pubblica` | chiave VAPID per il browser |
| PUT/DELETE | `/api/notifiche/iscrizione` | attiva/aggiorna/spegne il promemoria di un dispositivo |
| PUT | `/api/profilo` | cambia nome e cognome di chi è collegato |

Chiavi dei documenti condivise con la terapeuta: `attivita-provate`, `abilita-personali`, `note-paziente`, `note-terapeuta`, `fogli`.
Tutte le altre (post-it, preferiti, impostazioni…) sono private.

## Database

In produzione lo schema lo gestisce **Flyway** (`src/main/resources/db/migration`): ogni modifica va in un nuovo file `V2__…sql`, mai modificando i precedenti. Un test (`MigrazioniPostgresTest`) avvia l'app su un PostgreSQL vero e verifica che migrazioni ed entità coincidano; in GitHub Actions gira ad ogni push.

## Promemoria push

1. Genera le chiavi una volta sola: `npx web-push generate-vapid-keys`
2. Imposta sul server `VAPID_PUBLIC`, `VAPID_PRIVATE` e `VAPID_SUBJECT` (es. `mailto:tua@email`).
3. Senza chiavi i promemoria sono spenti. Con le chiavi, ogni 5 minuti il server manda il promemoria a chi lo ha attivato, se l'orario scelto è passato da meno di 3 ore, oggi non ha compilato il diario e non ne ha già ricevuto uno.

## Trasferire i dati da Supabase

1. In Supabase → SQL Editor esegui `migrazione/esporta-supabase.sql` e salva il risultato in `esportazione.json`.
2. Con il database di produzione configurato: 
   `java -jar marea.jar --spring.profiles.active=prod,importa-supabase --importa.file=esportazione.json`
3. Vengono creati utenti (con lo stesso hash password: si entra con la password di sempre), diario, post-it, preferiti, note, fogli e collegamenti terapeuta–paziente. Si può rilanciare senza duplicare: gli utenti già presenti sono saltati.
4. Le iscrizioni push **non** si trasferiscono (sono legate al vecchio sito): dopo il passaggio basta riattivare le notifiche dalle impostazioni.
5. Cancella `esportazione.json` a fine lavoro: contiene gli hash delle password.
