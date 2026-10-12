import { describe, expect, it } from 'vitest';
import { compilata, conValore, daRisposta, voceVuota } from './voce.js';

describe('voce del diario', () => {
  it('daRisposta senza dati da una voce vuota', () => {
    expect(daRisposta(null)).toEqual({ scale: {}, toggle: {}, testi: {} });
    expect(voceVuota(daRisposta(null))).toBe(true);
  });

  it('daRisposta tiene solo scale, sì/no e testi', () => {
    const v = daRisposta({ scale: { ai: 3 }, toggle: null, testi: { note: 'x' }, planner: { a: 1 } });
    expect(v).toEqual({ scale: { ai: 3 }, toggle: {}, testi: { note: 'x' } });
  });

  it('conValore imposta senza modificare l\'originale', () => {
    const base = daRisposta(null);
    const nuova = conValore(base, 'scale', 'ai', 4);
    expect(nuova.scale).toEqual({ ai: 4 });
    expect(base.scale).toEqual({});
  });

  it.each([[null], [''], [undefined]])('conValore con %s toglie il dato', (vuoto) => {
    const v = conValore({ scale: { ai: 4 }, toggle: {}, testi: {} }, 'scale', 'ai', vuoto);
    expect(v.scale).toEqual({});
  });

  it('compilata guarda tutte le parti, anche planner e abilità', () => {
    expect(compilata({ scale: {}, planner: { mattina: ['x'] } })).toBe(true);
    expect(compilata({ abilitaUsate: { dear: true } })).toBe(true);
    expect(compilata({ scale: {}, toggle: {}, testi: {} })).toBe(false);
    expect(compilata(undefined)).toBe(false);
  });
});
