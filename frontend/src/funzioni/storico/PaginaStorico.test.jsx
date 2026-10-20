import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { diarioApi } from '../../api/diario.js';
import { chiave } from '../diario/date.js';
import PaginaStorico from './PaginaStorico.jsx';

vi.mock('../../api/diario.js', () => ({ diarioApi: { salva: vi.fn(), intervallo: vi.fn() } }));

const oggi = chiave(new Date());
const vecchio = '2025-01-15';

describe('PaginaStorico', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    diarioApi.intervallo.mockResolvedValue([
      { data: oggi, scale: { sp: 3, ser: 4 }, toggle: { sa: 'No' }, testi: {}, abilitaUsate: { sk_Mindfulness_Osservare: true }, planner: { sera: ['Leggi'] } },
      { data: vecchio, scale: { ser: 1 }, toggle: {}, testi: { alcu: 'vino' } },
    ]);
  });

  it('di default mostra gli ultimi 7 giorni con i contatori', async () => {
    render(<PaginaStorico />);
    expect(await screen.findByText(/giorni compilati/)).toBeInTheDocument();
    expect(screen.getByText('su 7', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Pensieri suic. 3')).toBeInTheDocument();
    expect(screen.queryByText('vino')).not.toBeInTheDocument();
  });

  it('con "Tutti" compaiono anche i giorni più vecchi', async () => {
    render(<PaginaStorico />);
    await screen.findByText(/giorni compilati/);
    await userEvent.click(screen.getByRole('button', { name: 'Tutti' }));
    expect(screen.getByText('vino')).toBeInTheDocument();
  });

  it('aprendo un giorno si vede il dettaglio e si può chiudere', async () => {
    render(<PaginaStorico />);
    await screen.findByText('Pensieri suic. 3');
    await userEvent.click(screen.getByText('Pensieri suic. 3'));
    const pannello = screen.getByRole('dialog');
    expect(within(pannello).getByText('Comportamenti e sostanze')).toBeInTheDocument();
    expect(within(pannello).getByText('Osservare')).toBeInTheDocument();
    expect(within(pannello).getByText('Leggi')).toBeInTheDocument();
    await userEvent.click(within(pannello).getByRole('button', { name: 'Chiudi' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('la vista Trend mostra i nove grafici', async () => {
    render(<PaginaStorico />);
    await screen.findByText(/giorni compilati/);
    await userEvent.click(screen.getByRole('button', { name: 'Trend' }));
    expect(screen.getAllByRole('img')).toHaveLength(9);
    expect(screen.getByText('Emozioni positive')).toBeInTheDocument();
  });

  it('senza dati lo dice, e se il server non risponde avvisa', async () => {
    diarioApi.intervallo.mockResolvedValue([]);
    const { unmount } = render(<PaginaStorico />);
    expect(await screen.findByText('Nessun giorno compilato ancora.')).toBeInTheDocument();
    unmount();
    diarioApi.intervallo.mockRejectedValue(new Error('x'));
    render(<PaginaStorico />);
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });
});
