# Marea — React + Spring Boot

Riscrittura del progetto [diary-dbt](https://github.com/lauranappi/diary-dbt)
con un backend vero invece di appoggiarsi solo a Supabase.

Il progetto originale resta intoccato e in funzione — questo repository
è separato apposta.

## Struttura

- `frontend/` — React + Vite, chiamerà le API del backend
- `backend/` — Spring Boot + PostgreSQL, autenticazione JWT

## Stato

Funzionante nelle parti principali (diary, storico, abilità, fogli, piano di crisi,
appunti, diario del gruppo, emozioni, area terapeuta con note e sessioni). Vedi
`DEPLOY.md` per la messa online e i limiti noti, `ARCHITETTURA.md` per la struttura.

## Dove vivrà

- **Frontend**: stesso link di sempre (`lauranappi.github.io/marea`, dopo aver rinominato il repository in `marea`),
  quando pronto sostituirà il contenuto del repository originale
- **Backend**: un servizio a parte sempre acceso (Render, Railway o simili)
  — da scegliere e configurare
