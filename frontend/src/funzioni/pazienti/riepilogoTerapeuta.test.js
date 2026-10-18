import { describe, expect, it } from 'vitest';
import { giornataVuota, riepilogoTerapeuta } from './riepilogoTerapeuta.js';

describe('giornataVuota', () => {
  it('una giornata con soli zeri, nessun sì e testi vuoti è vuota', () => {
    expect(giornataVuota({ scale: { ser: 0, sp: null }, toggle: { sa: 'No' }, testi: { alcu: '  ' }, abilitaUsate: {}, planner: { mattina: [] } })).toBe(true);
    expect(giornataVuota(undefined)).toBe(true);
  });
  it('basta una cosa per renderla piena', () => {
    expect(giornataVuota({ scale: { ser: 3 } })).toBe(false);
    expect(giornataVuota({ toggle: { aa: 'Sì' } })).toBe(false);
    expect(giornataVuota({ testi: { x: 'ciao' } })).toBe(false);
    expect(giornataVuota({ abilitaUsate: { a: true } })).toBe(false);
    expect(giornataVuota({ planner: { sera: ['Tè'] } })).toBe(false);
  });
});

describe('riepilogoTerapeuta', () => {
  const anna = { id: 'p1', nome: 'Anna' };
  const bea = { id: 'p2', nome: 'Bea' };
  it('conta chi ha compilato oggi e ordina le segnalazioni dalla più recente', () => {
    const r = riepilogoTerapeuta([
      { paziente: anna, voci: [{ data: '2026-10-18', scale: { ser: 2 } }, { data: '2026-10-15', toggle: { sa: 'Sì' } }] },
      { paziente: bea, voci: [{ data: '2026-10-18', scale: {} }, { data: '2026-10-17', toggle: { aa: 'Sì' } }] },
    ], '2026-10-18');
    expect(r.compilateOggi).toBe(1);
    expect(r.segnalazioni.map((s) => [s.paziente.nome, s.giorno, s.tipo])).toEqual([
      ['Bea', '2026-10-17', 'autolesività'],
      ['Anna', '2026-10-15', 'azione suicidaria'],
    ]);
  });
});
