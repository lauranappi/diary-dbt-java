import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { diarioApi } from '../../api/diario.js';
import { salvaSessione } from '../../api/sessione.js';
import { chiave } from './date.js';
import { leggiBozza } from './bozza.js';
import PaginaDiario from './PaginaDiario.jsx';

vi.mock('../../api/diario.js', () => ({
  diarioApi: { salva: vi.fn(), intervallo: vi.fn() },
}));

const oggi = chiave(new Date());

async function avvia() {
  render(<PaginaDiario />);
  const u = userEvent.setup();
  await waitFor(() => expect(diarioApi.intervallo).toHaveBeenCalled());
  return u;
}

const scala = (nome) => screen.getByRole('group', { name: nome });
const cella = (nome, n) => within(scala(nome)).getByRole('button', { name: String(n) });

describe('PaginaDiario', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    salvaSessione({ token: 't', utente: { id: 'u1' } });
    diarioApi.intervallo.mockResolvedValue([]);
    diarioApi.salva.mockResolvedValue({});
  });

  it('parte da oggi, dal primo passo', async () => {
    await avvia();
    expect(screen.getByRole('heading', { name: 'Diary di oggi' })).toBeInTheDocument();
    expect(screen.getByText('1 di 4')).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'Pensieri suicidari (0–5)' })).toBeVisible();
  });

  it('carica e mostra i dati gia\' salvati del giorno', async () => {
    diarioApi.intervallo.mockResolvedValue([{ data: oggi, scale: { sp: 3 }, toggle: { sa: 'No' }, testi: {} }]);
    await avvia();
    await waitFor(() => expect(cella('Pensieri suicidari (0–5)', 3)).toHaveAttribute('aria-pressed', 'true'));
    expect(within(screen.getByRole('group', { name: 'Azione suicidaria' })).getByRole('button', { name: 'No' }))
      .toHaveAttribute('aria-pressed', 'true');
  });

  it('toccare di nuovo una scelta la toglie', async () => {
    const u = await avvia();
    await u.click(cella('Pensieri suicidari (0–5)', 2));
    expect(cella('Pensieri suicidari (0–5)', 2)).toHaveAttribute('aria-pressed', 'true');
    await u.click(cella('Pensieri suicidari (0–5)', 2));
    expect(cella('Pensieri suicidari (0–5)', 2)).toHaveAttribute('aria-pressed', 'false');
  });

  it('ogni modifica finisce subito in una bozza locale', async () => {
    const u = await avvia();
    await u.click(cella('Pensieri suicidari (0–5)', 4));
    expect(leggiBozza('u1', oggi).scale).toEqual({ sp: 4 });
  });

  it('scorre i quattro passi e salva all\'ultimo', async () => {
    const u = await avvia();
    await u.click(cella('Pensieri suicidari (0–5)', 1));
    for (let i = 0; i < 3; i++) await u.click(screen.getByRole('button', { name: 'Avanti' }));
    expect(screen.getByText('4 di 4')).toBeInTheDocument();
    await u.type(screen.getByLabelText('Note libere'), 'giornata ok');
    // sul telefono l'ultimo passo ha "Salva giornata"; nel test sono presenti entrambi i pulsanti
    await u.click(screen.getAllByRole('button', { name: 'Salva giornata' })[0]);

    await waitFor(() => expect(diarioApi.salva).toHaveBeenCalledWith({
      data: oggi, scale: { sp: 1 }, toggle: {}, testi: { note: 'giornata ok' },
    }));
    expect(await screen.findByRole('status')).toHaveTextContent('Salvato');
    expect(leggiBozza('u1', oggi)).toBeNull();
  });

  it('se il salvataggio fallisce avvisa e tiene la bozza', async () => {
    diarioApi.salva.mockRejectedValue(new Error('rete'));
    const u = await avvia();
    await u.click(cella('Pensieri suicidari (0–5)', 5));
    await u.click(screen.getAllByRole('button', { name: 'Salva giornata' })[0]);
    expect(await screen.findByRole('status')).toHaveTextContent('Non sono riuscita a salvare');
    expect(leggiBozza('u1', oggi).scale).toEqual({ sp: 5 });
  });

  it('cambiando giorno salva prima le modifiche e mostra l\'altro giorno', async () => {
    const u = await avvia();
    await u.click(cella('Pensieri suicidari (0–5)', 2));
    await u.click(screen.getByRole('button', { name: 'Giorno precedente' }));

    await waitFor(() => expect(diarioApi.salva).toHaveBeenCalledWith(expect.objectContaining({ data: oggi, scale: { sp: 2 } })));
    expect(await screen.findByRole('heading', { name: 'Diary di ieri' })).toBeInTheDocument();
    expect(cella('Pensieri suicidari (0–5)', 2)).toHaveAttribute('aria-pressed', 'false');
  });

  it('non si puo\' andare nel futuro', async () => {
    await avvia();
    expect(screen.getByRole('button', { name: 'Giorno successivo' })).toBeDisabled();
  });

  it('i giorni gia\' compilati hanno il segno nella striscia', async () => {
    diarioApi.intervallo.mockResolvedValue([{ data: oggi, scale: { sp: 1 }, toggle: {}, testi: {} }]);
    await avvia();
    expect(await screen.findByRole('button', { name: /, compilato$/ })).toBeInTheDocument();
  });
});
