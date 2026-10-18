import { describe, expect, it } from 'vitest';
import { GRUPPI_FOGLI, TUTTI_I_FOGLI, trovaFoglio } from './index.js';

describe('fogli di lavoro', () => {
  it('sono quelli di Marea, con id unici e riferimento al manuale', () => {
    expect(TUTTI_I_FOGLI).toHaveLength(35);
    expect(new Set(TUTTI_I_FOGLI.map((f) => f.id)).size).toBe(35);
    expect(GRUPPI_FOGLI.map((g) => g.fogli.length)).toEqual([2, 6, 14, 6, 7]);
    for (const f of TUTTI_I_FOGLI.filter((x) => !['g-catena', 'r-diario-emozioni'].includes(x.id))) expect(f.riferimento, f.id).toMatch(/Foglio di lavoro|Fogli di lavoro/);
  });

  it('ogni campo ha chiave unica nel foglio e le scelte hanno opzioni', () => {
    for (const f of TUTTI_I_FOGLI) {
      const chiavi = f.campi.filter((c) => c.k).map((c) => c.k);
      expect(new Set(chiavi).size, f.id).toBe(chiavi.length);
      for (const c of f.campi) if (c.tipo === 'scelta' || c.tipo === 'multi') expect(c.opzioni.length, `${f.id}.${c.k}`).toBeGreaterThan(1);
    }
  });

  it('si trova per id', () => {
    expect(trovaFoglio('t-stop').titolo).toBe('Praticare l’abilità STOP');
    expect(trovaFoglio('inesistente')).toBeNull();
  });
});
