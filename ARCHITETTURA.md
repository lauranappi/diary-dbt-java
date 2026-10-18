# Architettura di Marea (versione React + Spring Boot)

Marea nasce come app statica in JavaScript puro: funziona bene, ma il codice
è cresciuto in modo disordinato (variabili globali, file enormi, contenuti
della Guida mescolati alla logica). Questa versione serve a rifarla **ordinata**:
stesse funzioni e stesso aspetto, codice che si legge e si modifica senza paura.

## Regole del progetto

1. **Frontend: una cartella per funzionalità**. Chi cerca il codice del diario
   guarda in `diario/`, non in tre cartelle diverse. (Il backend invece è a livelli.)
2. **Niente variabili globali.** Lo stato sta nei componenti, in contesti React
   (`auth`, `impostazioni`) o nel server.
3. **I contenuti non sono codice.** Testi della Guida, schede, fogli ed elenchi
   di abilità stanno in file di dati (`frontend/src/contenuti/`), uno per modulo,
   con la stessa forma. La logica li legge, non li contiene.
4. **Il server è la fonte dei dati.** Il browser tiene solo una copia per usare
   l'app senza rete; la sincronizzazione sta in un unico punto (`api/`).
5. **File piccoli**: oltre ~250 righe si divide. Nomi in italiano come il dominio.
6. **Ogni cosa nuova ha un test** (backend: JUnit; frontend: Vitest).
7. **Il database cambia solo con migrazioni** (Flyway), mai con `ddl-auto`.

## Backend (`backend/`) — a livelli, come un normale progetto Spring Boot

```
com.marea
├── controller/   endpoint REST (@RestController): ricevono la richiesta e chiamano il service
├── service/      la logica (@Service): regole, controlli di accesso, unione dei documenti, promemoria push
├── repository/   accesso al database (interfacce Spring Data JPA)
├── model/        entità JPA (Utente, VoceDiario, DocumentoUtente, IscrizionePush)
├── dto/          oggetti di richiesta e risposta dell'API (mai le entità direttamente)
├── config/       sicurezza (SecurityConfig, filtro JWT) e avvio dell'importazione
├── exception/    eccezioni dell'applicazione e gestore degli errori
└── util/         costanti e piccole funzioni condivise
```

Il flusso è sempre `controller → service → repository`: il controller non
tocca mai un repository e il service non conosce HTTP. I test stanno nello
stesso pacchetto della classe che provano.

## Frontend (`frontend/src/`)

```
src/
├── api/          client HTTP, token, sincronizzazione con cache locale
├── app/          shell, routing, barra di navigazione, temi
├── stile/        variabili (colori, spazi, font) e stili base
├── componenti/   mattoncini riusabili (Scheda, Pulsante, Modale, Grafico…)
├── contenuti/    dati: moduli Guida, schede, fogli, riferimenti al manuale
└── funzioni/     una cartella per sezione: home, diario, guida, abilita,
                  storico, impostazioni, terapeuta, gruppo, preferiti
```

## Fasi e pull request

| Fase | Contenuto |
|------|-----------|
| 0 | Questo documento e il piano |
| 1 | Backend: pacchetti per funzionalità, Flyway, documenti personali, notifiche push, trasferimento dati da Supabase |
| 2 | Frontend: fondamenta (stili da zero, routing, login, shell, API con cache) |
| 3 | Pagine: Home, Diario, Abilità e planner, Storico, Impostazioni |
| 4 | Guida: contenuti come dati, ricerca, preferiti, fogli, post-it, schede |
| 5 | Terapeuta, Diario del gruppo, PWA (service worker, manifest, push client) |
| 6 | Pubblicazione: Render/Railway + GitHub Pages, istruzioni di migrazione |
