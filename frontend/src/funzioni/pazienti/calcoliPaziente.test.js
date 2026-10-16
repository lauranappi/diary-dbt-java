import { describe, expect, it } from 'vitest';
import { conteggioAbilita, giornatePianificate } from './calcoliPaziente.js';

describe('conteggioAbilita', () => {
  it('conta le spunte vere, ordina per frequenza e riconosce anche gli id sconosciuti', () => {
    const voci = [
      { abilitaUsate: { 'sk_Tolleranza della sofferenza_TIP': true, 'sk_Mindfulness_Osservare': true, sk_Nuovo_Altra_cosa: true } },
      { abilitaUsate: { 'sk_Tolleranza della sofferenza_TIP': true, 'sk_Mindfulness_Osservare': false } },
      {},
    ];
    expect(conteggioAbilita(voci)).toEqual([
      { nome: 'TIP', volte: 2 },
      { nome: 'Altra cosa', volte: 1 },
      { nome: 'Osservare', volte: 1 },
    ]);
  });
});

describe('giornatePianificate', () => {
  it('tiene solo i giorni con attività e le fasce piene, nell\'ordine mattina-pomeriggio-sera', () => {
    const voci = [
      { data: '2026-10-02', planner: { sera: ['Tè'], mattina: ['Corsa'], pomeriggio: [] } },
      { data: '2026-10-01', planner: { mattina: [] } },
      { data: '2026-09-30' },
    ];
    expect(giornatePianificate(voci)).toEqual([
      { data: '2026-10-02', fasce: [{ etichetta: 'Mattina', attivita: ['Corsa'] }, { etichetta: 'Sera', attivita: ['Tè'] }] },
    ]);
  });
});
