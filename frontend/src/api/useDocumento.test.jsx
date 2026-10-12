import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { documentiApi } from './documenti.js';
import { salvaSessione } from './sessione.js';
import { leggiLocale, scriviLocale } from './archivio-locale.js';
import { useDocumento } from './useDocumento.js';

vi.mock('./documenti.js', async (importaOriginale) => {
  const originale = await importaOriginale();
  return { ...originale, documentiApi: { leggi: vi.fn(), salva: vi.fn() } };
});

describe('useDocumento', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    salvaSessione({ token: 't', utente: { id: 'u1' } });
  });

  it('parte dal valore predefinito e poi prende quello del server', async () => {
    documentiApi.leggi.mockResolvedValue({ contenuto: { tema: 'scuro' }, versione: 2 });
    const { result } = renderHook(() => useDocumento('impostazioni', { predefinito: { tema: 'chiaro' } }));
    expect(result.current.valore).toEqual({ tema: 'chiaro' });
    await waitFor(() => expect(result.current.stato).toBe('sincronizzato'));
    expect(result.current.valore).toEqual({ tema: 'scuro' });
  });

  it('si apre subito dalla copia locale, anche prima della risposta del server', () => {
    scriviLocale('u1', 'impostazioni', { contenuto: { tema: 'locale' }, versione: 1, modificato: false });
    documentiApi.leggi.mockReturnValue(new Promise(() => {}));
    const { result } = renderHook(() => useDocumento('impostazioni'));
    expect(result.current.valore).toEqual({ tema: 'locale' });
  });

  it('imposta salva subito in locale e invia al server dopo una pausa', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    documentiApi.salva.mockResolvedValue({ versione: 1 });
    const { result } = renderHook(() => useDocumento('post-it', { predefinito: {} }));
    await waitFor(() => expect(result.current.stato).toBe('sincronizzato'));

    act(() => result.current.imposta((v) => ({ ...v, nota: 'ciao' })));
    expect(result.current.valore).toEqual({ nota: 'ciao' });
    expect(result.current.stato).toBe('in-attesa');
    expect(leggiLocale('u1', 'post-it').modificato).toBe(true);

    await waitFor(() => expect(documentiApi.salva).toHaveBeenCalledWith('post-it', { nota: 'ciao' }, 0), { timeout: 2000 });
    await waitFor(() => expect(result.current.stato).toBe('sincronizzato'));
    expect(leggiLocale('u1', 'post-it')).toMatchObject({ versione: 1, modificato: false });
  });

  it('senza rete tiene la modifica e segnala offline', async () => {
    documentiApi.leggi.mockRejectedValue(new Error('Server non raggiungibile'));
    const { result } = renderHook(() => useDocumento('post-it', { predefinito: {} }));
    await waitFor(() => expect(result.current.stato).toBe('offline'));

    act(() => result.current.imposta({ nota: 'offline' }));
    expect(result.current.valore).toEqual({ nota: 'offline' });
    expect(leggiLocale('u1', 'post-it').modificato).toBe(true);
  });
});
