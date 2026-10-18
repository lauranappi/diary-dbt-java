import { describe, expect, it } from 'vitest';
import { unisciFogli } from './unisciFogli.js';

const v = (id, ts, extra = {}) => ({ id, ts, v: { a: id }, ...extra });

describe('unisciFogli', () => {
  it('tiene i fogli di entrambi i dispositivi, i più recenti per primi', () => {
    const r = unisciFogli({ generici: { 't-stop': [v('x', 1)] } }, { generici: { 't-stop': [v('y', 2)] } });
    expect(r.generici['t-stop'].map((e) => e.id)).toEqual(['y', 'x']);
  });

  it('se lo stesso foglio è stato modificato vince la modifica più recente', () => {
    const vecchio = v('x', 1, { v: { a: 'vecchio' } });
    const nuovo = v('x', 1, { m: 5, v: { a: 'nuovo' } });
    expect(unisciFogli({ generici: { f: [vecchio] } }, { generici: { f: [nuovo] } }).generici.f[0].v.a).toBe('nuovo');
    expect(unisciFogli({ generici: { f: [nuovo] } }, { generici: { f: [vecchio] } }).generici.f[0].v.a).toBe('nuovo');
  });

  it('un foglio cancellato su un dispositivo non torna dall\'altro', () => {
    const adesso = 1_000_000_000_000;
    const r = unisciFogli({ generici: {}, cancellati: { 'f:x': adesso } }, { generici: { f: [v('x', 1), v('y', 2)] } }, adesso);
    expect(r.generici.f.map((e) => e.id)).toEqual(['y']);
    expect(r.cancellati['f:x']).toBe(adesso);
  });

  it('dimentica le cancellazioni vecchie di 90 giorni e non perde gli altri fogli del documento', () => {
    const adesso = 1_000_000_000_000;
    const r = unisciFogli({ cancellati: { 'f:x': adesso - 91 * 86400000 }, pianoCrisi: { a: 1 } }, { catena: [1] }, adesso);
    expect(r.cancellati).toEqual({});
    expect(r.pianoCrisi).toEqual({ a: 1 });
    expect(r.catena).toEqual([1]);
  });
});
