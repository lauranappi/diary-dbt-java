import { describe, expect, it } from 'vitest';
import { etichetteGiorno, riepilogo, serieSino, vociDelPeriodo, vociPerGrafici } from './calcoli.js';

const oggi = new Date(2026, 9, 12); // 12 ottobre 2026
const voce = (data, extra = {}) => ({ data, scale: {}, toggle: {}, testi: {}, ...extra });

describe('vociDelPeriodo', () => {
  const voci = [
    voce('2026-10-12', { scale: { sp: 3 } }),
    voce('2026-10-05', { scale: { ser: 2 } }),
    voce('2026-09-01', { scale: { ser: 1 } }),
    voce('2026-10-10'), // vuota: non conta
  ];

  it('prende i giorni compilati degli ultimi N giorni, dal più recente', () => {
    expect(vociDelPeriodo(voci, 7, oggi).map((v) => v.data)).toEqual(['2026-10-12']);
    expect(vociDelPeriodo(voci, 14, oggi).map((v) => v.data)).toEqual(['2026-10-12', '2026-10-05']);
  });

  it('con 0 prende tutto', () => {
    expect(vociDelPeriodo(voci, 0, oggi)).toHaveLength(3);
  });

  it('conta compilata anche una voce con solo abilità o piano', () => {
    const solo = [voce('2026-10-11', { abilitaUsate: { x: true } }), voce('2026-10-10', { planner: { sera: ['a'] } })];
    expect(vociDelPeriodo(solo, 7, oggi)).toHaveLength(2);
  });
});

describe('riepilogo', () => {
  it('conta azioni, sostanze, farmaci saltati, rapporti e abilità', () => {
    const r = riepilogo([
      voce('a', { toggle: { sa: 'Sì', farm: 'No', ee: 'Sì' }, testi: { alcu: 'un bicchiere', cbdu: ' ' }, scale: { rap: 2 } }),
      voce('b', { toggle: { aa: 'Sì', farm: 'Sì' }, abilitaUsate: { x: true, y: false, z: true }, scale: { rap: 1 } }),
    ]);
    expect(r).toMatchObject({
      giorniCompilati: 2, azioniSuicidarie: 1, azioniAutolesive: 1, giorniAlcol: 1, giorniCbd: 0,
      emotionalEating: 1, farmaciSaltati: 1, rapporti: 3, abilita: 2,
    });
  });
});

describe('etichetteGiorno', () => {
  it('segnala solo ciò che conta', () => {
    expect(etichetteGiorno(voce('a', { scale: { sp: 2, ai: 4 }, toggle: { sa: 'Sì', farm: 'Sì' } })))
      .toEqual(['Azione suicidaria', 'Autolesività 4', 'Farmaci']);
    expect(etichetteGiorno(voce('a', { scale: { sp: 3 } }))).toEqual(['Pensieri suic. 3']);
    expect(etichetteGiorno(voce('a'))).toEqual([]);
  });
});

describe('vociPerGrafici', () => {
  it('ordina dal più vecchio e, se il periodo è vuoto, ripiega sulle ultime voci', () => {
    const voci = [voce('2026-08-02', { scale: { sp: 1 } }), voce('2026-08-01', { scale: { sp: 2 } })];
    expect(vociPerGrafici(voci, 7, oggi).map((v) => v.data)).toEqual(['2026-08-01', '2026-08-02']);
  });

  it('serieSino vale 1 per Sì e 0 altrimenti', () => {
    expect(serieSino([voce('a', { toggle: { sa: 'Sì' } }), voce('b', { toggle: { sa: 'No' } }), voce('c')], 'sa')).toEqual([1, 0, 0]);
  });
});
