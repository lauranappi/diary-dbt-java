// "Nome Cognome" della paziente; se mancano, il suo username
export const nomePaziente = (p) => [p.nome, p.cognome].filter(Boolean).join(' ') || p.username;

export const giorniEtichetta = (n) => `${n} ${n === 1 ? 'giorno' : 'giorni'}`;

export const ultimoAggiornamento = (giorno) =>
  giorno
    ? new Date(`${giorno}T12:00:00`).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
    : 'mai';
