import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { diarioApi } from '../../api/diario.js';
import { salvaSessione } from '../../api/sessione.js';
import { chiave } from '../diario/date.js';
import PaginaAttivita from './PaginaAttivita.jsx';

vi.mock('../../api/diario.js', () => ({ diarioApi: { salva: vi.fn(), intervallo: vi.fn() } }));
vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn().mockResolvedValue(null), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

describe('PaginaAttivita', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    salvaSessione({ token: 't', utente: { id: 'u1' } });
    diarioApi.intervallo.mockResolvedValue([]);
    diarioApi.salva.mockResolvedValue({});
  });

  it('senza attività mostra lo stato vuoto', async () => {
    render(<PaginaAttivita />);
    expect(await screen.findByText('Nessuna attività pianificata')).toBeInTheDocument();
  });

  it('mostra il piano salvato diviso per fasce', async () => {
    diarioApi.intervallo.mockResolvedValue([{ planner: { mattina: ['Respira profondamente'], sera: [] } }]);
    render(<PaginaAttivita />);
    const mattina = await screen.findByRole('region', { name: 'Mattina' });
    expect(within(mattina).getByText('Respira profondamente')).toBeInTheDocument();
    expect(within(screen.getByRole('region', { name: 'Sera' })).getByText('Niente ancora')).toBeInTheDocument();
  });

  it('si sceglie un\'attività e il piano viene salvato', async () => {
    render(<PaginaAttivita />);
    await userEvent.click(await screen.findByRole('button', { name: 'Aggiungi attività' }));
    await userEvent.click(screen.getByRole('tab', { name: 'Gusto' }));
    await userEvent.click(screen.getByRole('button', { name: 'Offriti un dessert', exact: true }));
    await waitFor(() => expect(diarioApi.salva).toHaveBeenCalledWith(
      expect.objectContaining({ data: chiave(new Date()), planner: expect.objectContaining({}) }),
    ));
    const piano = diarioApi.salva.mock.calls.at(-1)[0].planner;
    expect(Object.values(piano).flat()).toEqual(['Offriti un dessert']);
    await userEvent.click(screen.getByRole('button', { name: 'Indietro' }));
    expect(screen.getAllByText('Offriti un dessert')).toHaveLength(1);
  });

  it('un\'attività personale entra nel piano e in "Le mie"', async () => {
    render(<PaginaAttivita />);
    await userEvent.click(await screen.findByRole('button', { name: 'Aggiungi attività' }));
    await userEvent.type(screen.getByLabelText('Aggiungi attività personalizzata'), 'chiamata con amica{Enter}');
    await waitFor(() => expect(diarioApi.salva).toHaveBeenCalled());
    expect(Object.values(diarioApi.salva.mock.calls.at(-1)[0].planner).flat()).toEqual(['chiamata con amica']);
    expect(screen.getByRole('button', { name: '✓ chiamata con amica', exact: true })).toBeInTheDocument();
  });

  it('toccando una pillola del riepilogo la toglie', async () => {
    diarioApi.intervallo.mockResolvedValue([{ planner: { mattina: ['A'], pomeriggio: ['B'] } }]);
    render(<PaginaAttivita />);
    await userEvent.click(await screen.findByRole('button', { name: 'A' }));
    await waitFor(() => expect(diarioApi.salva).toHaveBeenCalledWith(
      expect.objectContaining({ planner: { mattina: [], pomeriggio: ['B'], sera: [] } }),
    ));
  });
});
