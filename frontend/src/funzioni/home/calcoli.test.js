import { beforeEach, describe, expect, it } from 'vitest';
import { emozioniDiIeri, giorniDiFila, indiceSuggerimento, recordDiFila, ruotaSuggerimento, saluto, sofferenzaMedia, suggerimentiPer, ultimiSetteGiorni, vociCompilate } from './calcoli.js';

const oggi = new Date(2026, 9, 12); // lunedì 12 ottobre 2026
const voce = (data, scale = { ser: 1 }) => ({ data, scale, toggle: {}, testi: {} });

describe('giorniDiFila', () => {
  it('conta i giorni consecutivi fino a oggi', () => {
    expect(giorniDiFila([voce('2026-10-12'), voce('2026-10-11'), voce('2026-10-10'), voce('2026-10-08')], oggi)).toBe(3);
  });
  it('se oggi non è compilato la serie di ieri resta', () => {
    expect(giorniDiFila([voce('2026-10-11'), voce('2026-10-10')], oggi)).toBe(2);
  });
  it('zero se né oggi né ieri', () => {
    expect(giorniDiFila([voce('2026-10-09')], oggi)).toBe(0);
    expect(giorniDiFila([], oggi)).toBe(0);
  });
});

describe('emozioniDiIeri', () => {
  it('prende le tre più alte e lascia fuori i pensieri suicidari', () => {
    const r = emozioniDiIeri([voce('2026-10-11', { sp: 5, ser: 2, tri: 4, rab: 3, pau: 1 })], oggi);
    expect(r.map((e) => e.id)).toEqual(['tri', 'rab', 'ser']);
  });
  it('vuoto se ieri non c\'è la diary', () => {
    expect(emozioniDiIeri([], oggi)).toEqual([]);
  });
});

describe('ultimiSetteGiorni', () => {
  it('sette giorni che finiscono oggi, con lettera e altezza', () => {
    const g = ultimiSetteGiorni([voce('2026-10-12', { tri: 5, pau: 5 })], oggi);
    expect(g.map((x) => x.lettera).join('')).toBe('MMGVSDL');
    expect(g[6]).toMatchObject({ oggi: true, piena: true, altezza: 25 });
    expect(g[0]).toMatchObject({ piena: false, altezza: 8 });
  });
});

describe('suggerimenti', () => {
  beforeEach(() => localStorage.clear());

  it('con pensieri suicidari alti il primo è TIP', () => {
    expect(suggerimentiPer(voce('x', { sp: 4 }))[0].titolo).toContain('TIP');
  });
  it('senza dati restano solo quelli sempre disponibili', () => {
    const s = suggerimentiPer(null);
    expect(s.length).toBeGreaterThan(3);
    expect(s.every((x) => x.priorita === 4)).toBe(true);
  });
  it('serenità e gioia a zero contano come molto basse', () => {
    expect(suggerimentiPer(voce('x', { ser: 0, gio: 0 })).some((s) => s.titolo.startsWith('Costruisci emozioni'))).toBe(true);
  });
  it('la rotazione si ricorda per giorno e riparte da capo', () => {
    expect(indiceSuggerimento('2026-10-12')).toBe(0);
    ruotaSuggerimento('2026-10-12', 3);
    expect(indiceSuggerimento('2026-10-12')).toBe(1);
    ruotaSuggerimento('2026-10-12', 3);
    ruotaSuggerimento('2026-10-12', 3);
    expect(indiceSuggerimento('2026-10-12')).toBe(0);
  });
});

describe('saluto', () => {
  it('cambia con l\'ora', () => {
    expect([2, 9, 15, 19, 22].map(saluto)).toEqual(['Notte fonda', 'Buongiorno', 'Buon pomeriggio', 'Buonasera', 'Buonanotte']);
  });
});

const voceSe = (data, scale = { se: 2 }) => ({ data, scale, toggle: {}, testi: {} });

describe('desktop: record, sofferenza media, voci compilate', () => {
  it('il record e la serie piu\' lunga, anche se non e quella di oggi', () => {
    const voci = [voceSe('2026-05-01'), voceSe('2026-05-02'), voceSe('2026-05-03'), voceSe('2026-05-10'), voceSe('2026-05-11')];
    expect(recordDiFila(voci)).toBe(3);
    expect(recordDiFila([])).toBe(0);
  });

  it('la sofferenza media usa gli ultimi 14 giorni compilati', () => {
    expect(sofferenzaMedia([])).toBeNull();
    expect(sofferenzaMedia([voceSe('2026-05-01', { se: 4 }), voceSe('2026-05-02', { se: 2 }), voceSe('2026-05-03', { ser: 3 })])).toBe(3);
  });

  it('conta le risposte di scale e sì/no', () => {
    expect(vociCompilate({ scale: { ser: 1, se: 2 }, toggle: { sa: 'No' } })).toBe(3);
    expect(vociCompilate(undefined)).toBe(0);
  });
});
