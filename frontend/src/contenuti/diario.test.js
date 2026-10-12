import { describe, expect, it } from 'vitest';
import { PASSI } from './diario.js';

const campi = PASSI.flatMap((p) => p.gruppi.flatMap((g) => g.campi));
const ids = (tipo) => campi.filter((c) => c.tipo === tipo).map((c) => c.id);

describe('contenuti del diary', () => {
  it('ha i quattro passi di Marea', () => {
    expect(PASSI.map((p) => p.titolo)).toEqual(['Comportamenti', 'Sostanze e impulsi', 'Emozioni', 'Terapia e attività']);
  });

  it('ha le stesse domande di Marea', () => {
    expect(ids('scala').sort()).toEqual(
      ['sp', 'ai', 'ser', 'gio', 'pau', 'rab', 'tri', 'ver', 'col', 'vuo', 'sf', 'se', 'abb', 'fid', 'atti', 'alci', 'cbdi', 'rap'].sort(),
    );
    expect(ids('sino').sort()).toEqual(['aa', 'ee', 'farm', 'sa']);
  });

  it('nessuna domanda e\' ripetuta nello stesso tipo', () => {
    ['scala', 'sino', 'testo', 'area'].forEach((tipo) => {
      expect(new Set(ids(tipo)).size).toBe(ids(tipo).length);
    });
  });
});
