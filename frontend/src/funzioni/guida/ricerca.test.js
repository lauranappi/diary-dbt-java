import { describe, expect, it } from 'vitest';
import { cerca } from './ricerca.js';

describe('ricerca nella Guida', () => {
  it('trova una scheda dal titolo, senza badare agli accenti', () => {
    const ids = cerca('amorevole gentilezza').map((r) => r.scheda.id);
    expect(ids).toContain('mind-8');
    expect(cerca('mente SAGGIA').map((r) => r.scheda.id)).toContain('mind-3');
    expect(cerca('DEAR MAN').map((r) => r.scheda.id)).toContain('inter-5');
    expect(cerca('validazione').map((r) => r.scheda.id)).toEqual(expect.arrayContaining(['inter-6a', 'inter-17', 'inter-18']));
    expect(cerca('astinenza').map((r) => r.scheda.id)).toContain('tol-17');
  });

  it('trova le schede di Regolazione emotiva, anche dentro il testo', () => {
    expect(cerca('azione opposta').map((r) => r.scheda.id)).toContain('reg-10');
    expect(cerca('PLEASE').map((r) => r.scheda.id)).toContain('reg-20');
    expect(cerca('gelosia').map((r) => r.scheda.id)).toContain('reg-6');
    expect(cerca('igiene del sonno').map((r) => r.scheda.id)).toContain('reg-20b');
  });

  it('mette prima le schede che hanno la parola nel titolo', () => {
    expect(cerca('respiro')[0].punti).toBeGreaterThanOrEqual(cerca('respiro').at(-1).punti);
  });

  it('serve ogni parola scritta e ignora le domande troppo corte', () => {
    expect(cerca('zzzz qwerty')).toEqual([]);
    expect(cerca('a')).toEqual([]);
  });
});
