import { describe, expect, it } from 'vitest';
import { SUGGERIMENTI } from '../suggerimenti.js';
import { MODULI_GUIDA, haTesto, trovaModulo, trovaScheda } from './moduli.js';

describe('contenuti della Guida', () => {
  it('i moduli seguono l\'ordine del manuale', () => {
    expect(MODULI_GUIDA.map((m) => m.id)).toEqual(['pg', 'mind', 'inter', 'reg', 'tol']);
  });

  it('gli id delle schede sono unici e iniziano con quello del modulo', () => {
    const tutti = MODULI_GUIDA.flatMap((m) => m.schede.map((s) => [m.id, s.id]));
    expect(new Set(tutti.map(([, id]) => id)).size).toBe(tutti.length);
    for (const [modulo, id] of tutti) expect(id.startsWith(`${modulo}-`)).toBe(true);
  });

  it('ogni scheda ha numero e titolo, e il numero corrisponde all\'id', () => {
    for (const modulo of MODULI_GUIDA) {
      for (const s of modulo.schede) {
        expect(s.titolo).toBeTruthy();
        expect(s.id).toBe(`${modulo.id}-${s.numero.toLowerCase()}`);
      }
    }
  });

  it('le schede con testo hanno blocchi non vuoti', () => {
    for (const { schede } of MODULI_GUIDA) {
      for (const s of schede.filter(haTesto)) {
        for (const b of s.blocchi) expect(b.titolo || b.testo || b.voci?.length).toBeTruthy();
      }
    }
  });

  it('Parte generale e Mindfulness sono scritte per intero', () => {
    for (const id of ['pg', 'mind']) expect(trovaModulo(id).schede.every(haTesto)).toBe(true);
  });

  it('ogni suggerimento della Home porta a una scheda che esiste, nel suo modulo', () => {
    for (const s of SUGGERIMENTI) {
      const trovata = trovaScheda(s.scheda);
      expect(trovata, s.titolo).not.toBeNull();
      expect(trovata.modulo.id).toBe(s.guida);
    }
  });
});
