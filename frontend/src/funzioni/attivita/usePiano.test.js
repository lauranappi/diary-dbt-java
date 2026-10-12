import { describe, expect, it } from 'vitest';
import { alternaAttivita, conAttivita, haAttivita, normalizzaPiano, senzaAttivita } from './usePiano.js';

describe('piano delle attività', () => {
  it('le fasce mancanti sono vuote', () => {
    expect(normalizzaPiano({ sera: ['Leggi'] })).toEqual({ mattina: [], pomeriggio: [], sera: ['Leggi'] });
    expect(normalizzaPiano(null)).toEqual({ mattina: [], pomeriggio: [], sera: [] });
  });

  it('aggiunge senza duplicare e toglie, senza toccare l\'originale', () => {
    const vuoto = normalizzaPiano(null);
    const uno = conAttivita(vuoto, 'mattina', 'Respira profondamente');
    expect(conAttivita(uno, 'mattina', 'Respira profondamente')).toBe(uno);
    expect(vuoto.mattina).toEqual([]);
    expect(senzaAttivita(uno, 'mattina', 'Respira profondamente').mattina).toEqual([]);
  });

  it('alterna', () => {
    const p = alternaAttivita(normalizzaPiano(null), 'sera', 'X');
    expect(p.sera).toEqual(['X']);
    expect(alternaAttivita(p, 'sera', 'X').sera).toEqual([]);
  });

  it('haAttivita dice se c\'è almeno una voce', () => {
    expect(haAttivita(normalizzaPiano(null))).toBe(false);
    expect(haAttivita(normalizzaPiano({ pomeriggio: ['a'] }))).toBe(true);
  });
});
