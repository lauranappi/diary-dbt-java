-- Schema iniziale di Marea (PostgreSQL). Ogni modifica futura va in un nuovo
-- file V2__..., V3__... : mai modificare questo.

create table utenti (
    id              varchar(255) primary key,
    username        varchar(255) not null unique,
    password_hash   varchar(255) not null,
    nome            varchar(255),
    cognome         varchar(255),
    email           varchar(255) unique,
    ruolo           varchar(255) not null check (ruolo in ('PAZIENTE', 'TERAPEUTA')),
    codice_paziente varchar(255) unique,
    terapeuta_id    varchar(255) references utenti (id),
    collegata_il    timestamp(6) with time zone,
    creato_il       timestamp(6) with time zone
);
create index idx_utenti_terapeuta on utenti (terapeuta_id);

create table voci_diario (
    id            varchar(255) primary key,
    paziente_id   varchar(255) not null references utenti (id) on delete cascade,
    data          date not null,
    scale         jsonb,
    toggle        jsonb,
    testi         jsonb,
    abilita_usate jsonb,
    planner       jsonb,
    constraint uq_voci_diario_paziente_data unique (paziente_id, data)
);

create table documenti_utente (
    id           varchar(255) primary key,
    utente_id    varchar(255) not null references utenti (id) on delete cascade,
    chiave       varchar(40) not null,
    contenuto    jsonb,
    versione     bigint not null,
    aggiornato_il timestamp(6) with time zone not null,
    constraint uq_documenti_utente_chiave unique (utente_id, chiave)
);

create table iscrizioni_push (
    id           varchar(255) primary key,
    utente_id    varchar(255) not null references utenti (id) on delete cascade,
    endpoint     varchar(1000) not null unique,
    p256dh       varchar(255) not null,
    auth         varchar(255) not null,
    ora          varchar(5) not null,
    fuso         varchar(64) not null,
    attivo       boolean not null,
    ultimo_invio date,
    creato_il    timestamp(6) with time zone
);
