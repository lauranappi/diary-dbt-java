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
    const r = unisciFogli({ cancellati: { 'f:x': adesso - 91 * 86400000 }, pianoCrisi: { a: 1 } }, { altro: [1] }, adesso);
    expect(r.cancellati).toEqual({});
    expect(r.pianoCrisi).toEqual({ a: 1 });
    expect(r.altro).toEqual([1]);
  });
});

describe('dati importati da Marea', () => {
  const ORA = Date.now();
  it('i quattro elenchi di Marea diventano fogli come gli altri, con le lapidi', () => {
    const r = unisciFogli(null, {
      controllaFatti: [{ id: 1700000000001, data: '2026-03-01T10:00:00.000Z', corrisponde: 3, 'cf-emozione': 'Rabbia', 'cf-int-prima': '80', 'cf-evento-fatti': 'x', 'cf-catastrofe': '' }],
      proContro: [{ id: 1700000000002, data: '2026-03-02T10:00:00.000Z', 'pc2-situazione': 'Lite', 'pc2-usare-pro': 'calma' }],
      diarioEmozioni: [{ id: 1700000000003, data: '2026-03-03', emozione: 'Tristezza', intensita: 4 }],
      catena: [{ id: 1700000000004, data: '2026-03-04', comportamento: 'Isolarmi' }],
      cancellati: { 'diario_emo:1700000000009': ORA },
      pianoCrisi: { a1: 'Respirare' },
    });
    expect(r.controllaFatti).toBeUndefined();
    expect(r.generici['r-controlla-fatti'][0]).toEqual({ id: '1700000000001', ts: 1700000000001, v: { emozione: 'Rabbia', prima: '80', eventoFatti: 'x', corrisponde: '3' } });
    expect(r.generici['g-pro-contro'][0].v).toEqual({ situazione: 'Lite', usarePro: 'calma' });
    expect(r.generici['r-diario-emozioni'][0].v).toEqual({ emozione: 'Tristezza', intensita: '4' });
    expect(r.generici['g-catena'][0].v).toEqual({ comportamento: 'Isolarmi' });
    expect(r.cancellati).toEqual({ 'r-diario-emozioni:1700000000009': ORA });
    expect(r.pianoCrisi).toEqual({ a1: 'Respirare' });
  });

  it('un foglio cancellato in Marea non torna dai dati importati', () => {
    const r = unisciFogli(null, { catena: [{ id: 5, data: '2026-03-04', comportamento: 'x' }], cancellati: { 'catena_list:5': Date.now() } });
    expect(r.generici['g-catena'] ?? []).toEqual([]);
  });

  it('il piano di crisi di questo dispositivo vince se ha del testo, altrimenti si tiene quello del server', () => {
    expect(unisciFogli({ pianoCrisi: { a1: 'qui' } }, { pianoCrisi: { a1: 'server' } }).pianoCrisi.a1).toBe('qui');
    expect(unisciFogli({ pianoCrisi: { a1: '' } }, { pianoCrisi: { a1: 'server' } }).pianoCrisi.a1).toBe('server');
  });
});
