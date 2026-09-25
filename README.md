# Diary Card DBT — React + Spring Boot

Riscrittura del progetto [diary-dbt](https://github.com/lauranappi/diary-dbt)
con un backend vero invece di appoggiarsi solo a Supabase.

Il progetto originale resta intoccato e in funzione — questo repository
è separato apposta.

## Struttura

- `frontend/` — React + Vite, chiamerà le API del backend
- `backend/` — Spring Boot + PostgreSQL, autenticazione JWT

## Stato

Impalcatura iniziale. Sul backend: registrazione/accesso e salvataggio del
diario sono scritti (**ma non ancora compilati/testati** — vedi
`backend/README.md`). Sul frontend: solo lo scaffold di default di Vite,
nessuna pagina ancora migrata.

## Dove vivrà

- **Frontend**: stesso link di sempre (`lauranappi.github.io/diary-dbt`),
  quando pronto sostituirà il contenuto del repository originale
- **Backend**: un servizio a parte sempre acceso (Render, Railway o simili)
  — da scegliere e configurare
