# Messa online di Marea

Servono tre pezzi: un database PostgreSQL, il backend (Spring Boot) e il
frontend (file statici su GitHub Pages).

## 1. Database

Un PostgreSQL qualsiasi (Render, Railway, Neon, Supabase…). Annota indirizzo
JDBC, utente e password. Le tabelle le crea Flyway al primo avvio.

## 2. Backend

Hosting con Java 21 o Docker (Render, Railway, Fly…). Comando di build:
`mvn -q package -DskipTests`; avvio: `java -jar target/*.jar`.

Variabili d'ambiente:

| Variabile | Cosa è |
|---|---|
| `SPRING_PROFILES_ACTIVE` | `prod` |
| `DATABASE_URL` | es. `jdbc:postgresql://host:5432/marea` |
| `DATABASE_USERNAME`, `DATABASE_PASSWORD` | credenziali del database |
| `JWT_SECRET` | stringa lunga e casuale (almeno 32 caratteri) |
| `APP_CORS_ORIGIN` | `https://lauranappi.github.io` |
| `VAPID_PUBLIC`, `VAPID_PRIVATE`, `VAPID_SUBJECT` | opzionali: servono solo per i promemoria push; senza, sono spenti |

Chiavi VAPID (una volta sola): `npx web-push generate-vapid-keys`; `VAPID_SUBJECT`
è un `mailto:` tuo.

## 3. Frontend

1. Nel repository su GitHub: Settings → Pages → sorgente "GitHub Actions"
   (oppure pubblica la cartella `frontend/dist` sul ramo `gh-pages`).
2. Imposta `VITE_API_URL` all'indirizzo pubblico del backend (senza `/` finale)
   prima di `npm run build` (in `frontend/`).
3. L'app è servita da `/diary-dbt-java/` (vedi `base` in `vite.config.js`). Se
   la sposti su un altro percorso, cambia `base` e `start_url`.

## 4. Portare i dati da Marea (Supabase)

1. Nel progetto Supabase apri l'editor SQL ed esegui
   `backend/migrazione/esporta-supabase.sql`: restituisce un unico JSON.
   Salvalo come `esportazione.json`.
2. Avvia il backend una volta in modalità importazione, con le variabili di
   produzione già impostate:

   ```bash
   java -jar marea.jar --spring.profiles.active=prod,importa-supabase \
        --importa.file=esportazione.json
   ```
3. A fine importazione viene stampato un riepilogo (utenti, diari, documenti).
   Poi riavvia normalmente, senza il profilo `importa-supabase`.

Nota: l'importazione è stata provata solo su dati inventati. Fai prima una prova
su un database vuoto e controlla i risultati.

## Cose non (ancora) presenti

- Recupero password via email: non c'è; una password dimenticata va reimpostata
  a mano nel database.
- I preferiti di Marea (`guida.pref`) non si mappano sulle nuove schede e non vengono mostrati.
- I post-it "teoria correlata" di Marea non sono stati portati.
- L'app non è stata provata end-to-end contro un backend vero in questo ambiente
  (i test del backend girano su GitHub Actions, quelli del frontend usano API simulate).
