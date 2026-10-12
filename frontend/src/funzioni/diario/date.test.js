import { describe, expect, it } from 'vitest';
import { aggiungiGiorni, chiave, daChiave, eFuturo, giorniRecenti, titoloGiorno } from './date.js';

const oggi = new Date(2026, 9, 12, 15, 30); // lunedì 12 ottobre 2026

describe('date del diary', () => {
  it('chiave usa il giorno locale nel formato del server', () => {
    expect(chiave(new Date(2026, 0, 5, 23, 59))).toBe('2026-01-05');
  });

  it('daChiave e chiave sono inverse', () => {
    expect(chiave(daChiave('2026-10-12'))).toBe('2026-10-12');
  });

  it('aggiungiGiorni passa da un mese all\'altro', () => {
    expect(chiave(aggiungiGiorni(new Date(2026, 9, 31), 1))).toBe('2026-11-01');
  });

  it('eFuturo e\' vero solo dopo oggi', () => {
    expect(eFuturo(new Date(2026, 9, 13), oggi)).toBe(true);
    expect(eFuturo(new Date(2026, 9, 12, 23, 0), oggi)).toBe(false);
  });

  it('giorniRecenti finisce oggi e va indietro', () => {
    const g = giorniRecenti(3, oggi).map(chiave);
    expect(g).toEqual(['2026-10-10', '2026-10-11', '2026-10-12']);
  });

  it('titoloGiorno distingue oggi, ieri e gli altri', () => {
    expect(titoloGiorno(oggi, oggi)).toBe('Diary di oggi');
    expect(titoloGiorno(new Date(2026, 9, 11), oggi)).toBe('Diary di ieri');
    expect(titoloGiorno(new Date(2026, 9, 9), oggi)).toBe('Diary di venerdì');
  });
});
