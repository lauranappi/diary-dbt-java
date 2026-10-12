# Marea — frontend (React + Vite)

```bash
cd frontend
cp .env.example .env     # indirizzo del backend (default: http://localhost:8080)
npm install
npm run dev              # sviluppo
npm test                 # test (Vitest + Testing Library)
npm run lint             # controllo del codice (oxlint)
npm run build            # versione di produzione
```

## Come è organizzato (vedi `../ARCHITETTURA.md`)

```
src/
├── app/            App, percorsi, cornice con barra in basso, rotte protette
├── api/            tutto cio' che parla col server
│   ├── cliente.js          unica porta verso il backend (token, errori)
│   ├── sessione.js         token e utente salvati nel browser
│   ├── documenti.js        i documenti personali sul server
│   ├── sincronizzatore.js  accordo tra copia locale e server (con unione sui conflitti)
│   └── useDocumento.js     un documento come stato React: locale subito, server dopo
├── stile/          token.css (colori, forme, testo, spazi) e base.css
├── componenti/     mattoncini riusabili (Pulsante, Campo, Scheda, Hero, BarraInferiore…)
├── contenuti/      testi e dati (schede, abilità…), separati dalla logica
└── funzioni/       una cartella per sezione: autenticazione, home, … (le altre arrivano)
```

Gli stili sono CSS Modules: ogni componente ha il suo file `.module.css` e usa solo le variabili di `stile/token.css`.

## Salvare dati personali

```jsx
const { valore, imposta, stato } = useDocumento('impostazioni', { predefinito: { orario: '21:00' } });
imposta((v) => ({ ...v, orario: '20:30' }));   // salva subito in locale, al server poco dopo
```

Funziona anche senza rete: la modifica resta sul dispositivo e parte appena torna la connessione.
Se due dispositivi cambiano lo stesso documento, `unisci(locale, remoto)` (facoltativo) decide come combinarli.
