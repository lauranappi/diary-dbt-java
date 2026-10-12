// La parte del diario che si compila nella pagina Diary: scale, sì/no e testi.
// (Abilità spuntate e planner hanno le loro pagine e non si toccano da qui.)
export const VOCE_VUOTA = Object.freeze({ scale: {}, toggle: {}, testi: {} });

export function daRisposta(risposta) {
  if (!risposta) return { scale: {}, toggle: {}, testi: {} };
  return {
    scale: { ...(risposta.scale || {}) },
    toggle: { ...(risposta.toggle || {}) },
    testi: { ...(risposta.testi || {}) },
  };
}

// Imposta (o toglie, se valore e' null/vuoto) un singolo dato, senza modificare l'originale
export function conValore(voce, parte, id, valore) {
  const nuova = { ...voce[parte] };
  if (valore === null || valore === undefined || valore === '') delete nuova[id];
  else nuova[id] = valore;
  return { ...voce, [parte]: nuova };
}

export function voceVuota(voce) {
  return [voce.scale, voce.toggle, voce.testi].every((p) => Object.keys(p || {}).length === 0);
}

// Una voce arrivata dal server conta come compilata se ha qualcosa, in qualunque sua parte
export function compilata(rispostaServer) {
  return ['scale', 'toggle', 'testi', 'abilitaUsate', 'planner']
    .some((parte) => Object.keys(rispostaServer?.[parte] || {}).length > 0);
}
