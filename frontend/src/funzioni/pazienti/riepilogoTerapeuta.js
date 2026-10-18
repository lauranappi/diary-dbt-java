// Per la home della terapeuta: chi ha compilato oggi e le segnalazioni degli ultimi giorni

// Una giornata senza nulla dentro (scale a zero, nessun sì, nessun testo, nessuna abilità, nessun piano)
export function giornataVuota(voce) {
  if (!voce) return true;
  const scala = Object.values(voce.scale || {}).some((v) => v != null && v !== 0);
  const sino = Object.values(voce.toggle || {}).some((v) => v === 'Sì');
  const testo = Object.values(voce.testi || {}).some((v) => typeof v === 'string' && v.trim());
  const abilita = Object.values(voce.abilitaUsate || {}).some(Boolean);
  const piano = Object.values(voce.planner || {}).some((a) => Array.isArray(a) && a.length > 0);
  return !(scala || sino || testo || abilita || piano);
}

// vociPerPaziente: [{ paziente, voci }]. Segnalazioni: azione suicidaria (sa) o autolesività (aa), dalla più recente.
export function riepilogoTerapeuta(vociPerPaziente, oggi) {
  let compilateOggi = 0;
  const segnalazioni = [];
  for (const { paziente, voci } of vociPerPaziente) {
    if (voci.some((v) => v.data === oggi && !giornataVuota(v))) compilateOggi += 1;
    for (const v of voci) {
      const sino = v.toggle || {};
      if (sino.sa === 'Sì' || sino.aa === 'Sì') {
        segnalazioni.push({ pazienteId: paziente.id, paziente, giorno: v.data, tipo: sino.sa === 'Sì' ? 'azione suicidaria' : 'autolesività' });
      }
    }
  }
  segnalazioni.sort((a, b) => b.giorno.localeCompare(a.giorno));
  return { compilateOggi, segnalazioni };
}
