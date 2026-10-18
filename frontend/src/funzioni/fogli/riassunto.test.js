import { describe, expect, it } from 'vitest';
import { anteprima, riassunto } from './riassunto.js';
import { trovaFoglio } from '../../contenuti/fogli/index.js';

describe('riassunto', () => {
  const stop = trovaFoglio('t-stop');
  it('salta titoli e campi vuoti e scrive la scala su 100', () => {
    const r = riassunto(stop, { ev: 'litigio', prima: 80, comp: '' });
    expect(r).toEqual([
      { etichetta: expect.stringContaining('Evento scatenante'), valore: 'litigio' },
      { etichetta: 'Livello di sofferenza prima (0-100)', valore: '80/100' },
    ]);
  });
  it('l\'anteprima è la prima risposta scritta', () => {
    expect(anteprima(stop, { prima: 5, ev: 'litigio' })).toBe('litigio');
    expect(anteprima(stop, {})).toBe('(vuoto)');
  });
});
