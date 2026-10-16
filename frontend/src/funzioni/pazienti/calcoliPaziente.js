import { FASCE } from '../../contenuti/attivita.js';
import { GRUPPI_ABILITA, idAbilita } from '../../contenuti/abilita.js';

// Quante volte ogni abilità è stata spuntata nelle giornate date, dalla più usata.
// Gli id non riconosciuti (formato 'sk_<gruppo>_<nome>', come in Marea) mostrano il nome dopo il gruppo.
export function conteggioAbilita(voci) {
  const nomi = new Map();
  for (const g of GRUPPI_ABILITA) for (const v of g.voci) nomi.set(idAbilita(g.nome, v), v);
  const conti = new Map();
  for (const voce of voci) {
    for (const [id, attiva] of Object.entries(voce.abilitaUsate ?? {})) {
      if (!attiva) continue;
      const nome = nomi.get(id) ?? id.replace(/^sk_/, '').split('_').slice(1).join(' ');
      conti.set(nome, (conti.get(nome) ?? 0) + 1);
    }
  }
  return [...conti.entries()]
    .map(([nome, volte]) => ({ nome, volte }))
    .sort((a, b) => b.volte - a.volte || a.nome.localeCompare(b.nome, 'it'));
}

// Le giornate con almeno un'attività pianificata, con le fasce piene (voci già in ordine di data)
export function giornatePianificate(voci) {
  return voci
    .map((voce) => ({
      data: voce.data,
      fasce: FASCE.filter(({ id }) => voce.planner?.[id]?.length).map(({ id, etichetta }) => ({ etichetta, attivita: voce.planner[id] })),
    }))
    .filter((g) => g.fasce.length > 0);
}
