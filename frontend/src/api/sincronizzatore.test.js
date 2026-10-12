import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ConflittoVersione, documentiApi } from './documenti.js';
import { sincronizza } from './sincronizzatore.js';

vi.mock('./documenti.js', async (importaOriginale) => {
  const originale = await importaOriginale();
  return { ...originale, documentiApi: { leggi: vi.fn(), salva: vi.fn() } };
});

const unisciSomma = (locale, remoto) => ({ n: locale.n + remoto.n });

describe('sincronizza', () => {
  beforeEach(() => vi.clearAllMocks());

  it('senza modifiche locali prende quello che c\'e\' sul server', async () => {
    documentiApi.leggi.mockResolvedValue({ contenuto: { n: 5 }, versione: 3 });
    const r = await sincronizza('x', { contenuto: { n: 1 }, versione: 1, modificato: false }, unisciSomma);
    expect(r).toEqual({ contenuto: { n: 5 }, versione: 3, modificato: false });
    expect(documentiApi.salva).not.toHaveBeenCalled();
  });

  it('se il documento non esiste sul server lo crea con versione di partenza 0', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    documentiApi.salva.mockResolvedValue({ versione: 1 });
    const r = await sincronizza('x', { contenuto: { n: 2 }, versione: 0, modificato: true }, unisciSomma);
    expect(documentiApi.salva).toHaveBeenCalledWith('x', { n: 2 }, 0);
    expect(r).toEqual({ contenuto: { n: 2 }, versione: 1, modificato: false });
  });

  it('con modifiche locali e server cambiato unisce i due contenuti', async () => {
    documentiApi.leggi.mockResolvedValue({ contenuto: { n: 10 }, versione: 4 });
    documentiApi.salva.mockResolvedValue({ versione: 5 });
    const r = await sincronizza('x', { contenuto: { n: 1 }, versione: 4, modificato: true }, unisciSomma);
    expect(documentiApi.salva).toHaveBeenCalledWith('x', { n: 11 }, 4);
    expect(r.versione).toBe(5);
  });

  it('in caso di conflitto riparte dalla versione attuale e riprova', async () => {
    documentiApi.leggi.mockResolvedValue({ contenuto: { n: 10 }, versione: 4 });
    documentiApi.salva
      .mockRejectedValueOnce(new ConflittoVersione({ contenuto: { n: 20 }, versione: 5 }))
      .mockResolvedValueOnce({ versione: 6 });
    const r = await sincronizza('x', { contenuto: { n: 1 }, versione: 4, modificato: true }, unisciSomma);
    expect(documentiApi.salva).toHaveBeenLastCalledWith('x', { n: 31 }, 5);
    expect(r.versione).toBe(6);
  });

  it('se il server non risponde l\'errore risale a chi chiama', async () => {
    documentiApi.leggi.mockRejectedValue(new Error('Server non raggiungibile'));
    await expect(sincronizza('x', null, unisciSomma)).rejects.toThrow('Server non raggiungibile');
  });
});
