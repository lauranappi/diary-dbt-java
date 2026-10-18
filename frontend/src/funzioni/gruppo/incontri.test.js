import { describe, expect, it } from 'vitest';
import { ambiti, ambitoPerPagina, collegamentoNuovo, dateCercabili, filtra, intervallo, normalizza, riepilogoPagine, titoli } from './incontri.js';

const inc = (id, g, pp, extra = {}) => normalizza({ id, g, pp, ts: 1, ...extra });
const adesso = new Date(2026, 9, 18);

describe('ambiti', () => {
  it('si ricavano dai numeri di pagina del manuale', () => {
    expect([10, 60, 150, 250, 380, 500].map(ambitoPerPagina)).toEqual(['gen', 'mind', 'inter', 'reg', 'tol', '']);
    expect(ambitoPerPagina('')).toBe('');
  });
  it('si ordinano per frequenza, contando anche i collegamenti', () => {
    expect(ambiti([{ p: '60' }, { p: '70' }, { p: '250', l: 'x' }], () => 'reg')).toEqual(['mind', 'reg']);
  });
});

describe('normalizza', () => {
  it('porta le pagine singole di Marea alla forma attuale e rinomina i collegamenti ai fogli speciali', () => {
    const x = normalizza({ id: 'a', g: '2026-10-05', p: '228', t: 'Controlla i fatti', l: 'cf:77', m: 'reg' });
    expect(x.pp).toEqual([{ p: '228', t: 'Controlla i fatti', l: 'fe:r-controlla-fatti:77' }]);
    expect(x.mm).toEqual(['reg']);
    expect(collegamentoNuovo('de:5')).toBe('fe:r-diario-emozioni:5');
    expect(collegamentoNuovo('sk:stop')).toBe('sk:stop');
  });
  it('i vecchi collegamenti separati (ll) diventano righe di pagina', () => {
    expect(normalizza({ id: 'a', pp: [], ll: ['fg:t-stop'] }).pp).toEqual([{ p: '', t: '', l: 'fg:t-stop' }]);
  });
  it('riassume pagine e titoli', () => {
    const x = inc('a', '2026-10-05', [{ p: '10', t: 'Obiettivi' }, { p: '12', t: 'Teoria' }]);
    expect(riepilogoPagine(x)).toBe('pp. 10, 12');
    expect(titoli(x)).toBe('Obiettivi · Teoria');
    expect(riepilogoPagine(inc('b', '2026-10-05', []))).toBe('incontro');
  });
});

describe('intervallo e date', () => {
  it('capisce gli intervalli scritti in più modi', () => {
    expect(intervallo('dal 5/10 al 12/10', adesso)).toMatchObject({ da: '2026-10-05', a: '2026-10-12' });
    expect(intervallo('12/10/2026 - 5/10/2026', adesso)).toMatchObject({ da: '2026-10-05', a: '2026-10-12' });
    expect(intervallo('dal 5 al 12 ottobre', adesso)).toMatchObject({ da: '2026-10-05', a: '2026-10-12' });
    expect(intervallo('mindfulness', adesso)).toBeNull();
  });
  it('una data si cerca in tutte le sue forme', () => {
    const forme = dateCercabili('2026-10-05');
    for (const f of ['5/10/2026', '05/10', '2026-10-05', 'ottobre']) expect(forme).toContain(f);
  });
});

describe('filtra', () => {
  const lista = [
    inc('a', '2026-10-05', [{ p: '60', t: 'Mente saggia' }]),
    inc('b', '2026-10-12', [{ p: '250', t: 'Controlla i fatti' }]),
    inc('c', '2026-09-28', [{ p: '380', t: 'TIP' }]),
  ];
  it('cerca per titolo, pagina, ambito e testo dei post-it', () => {
    expect(filtra(lista, 'mente', () => '', adesso).map((x) => x.id)).toEqual(['a']);
    expect(filtra(lista, '250', () => '', adesso).map((x) => x.id)).toEqual(['b']);
    expect(filtra(lista, 'tolleranza', () => '', adesso)).toEqual([]);
    expect(filtra(lista.map((x) => ({ ...x, mm: x.id === 'c' ? ['tol'] : [] })), 'tolleranza', () => '', adesso).map((x) => x.id)).toEqual(['c']);
    expect(filtra(lista, 'respiro', (x) => (x.id === 'c' ? 'ricordare il respiro' : ''), adesso).map((x) => x.id)).toEqual(['c']);
  });
  it('cerca per data e per intervallo, dal più recente', () => {
    expect(filtra(lista, '5/10', () => '', adesso).map((x) => x.id)).toEqual(['a']);
    expect(filtra(lista, 'dal 1/10 al 31/10', () => '', adesso).map((x) => x.id)).toEqual(['b', 'a']);
    expect(filtra(lista, '', () => '', adesso).map((x) => x.id)).toEqual(['b', 'a', 'c']);
  });
});
