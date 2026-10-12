import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { diarioApi } from '../../api/diario.js';
import { salvaSessione } from '../../api/sessione.js';
import { ProviderAutenticazione } from '../autenticazione/ProviderAutenticazione.jsx';
import { aggiungiGiorni, chiave } from '../diario/date.js';
import PaginaHome from './PaginaHome.jsx';

vi.mock('../../api/diario.js', () => ({ diarioApi: { salva: vi.fn(), intervallo: vi.fn() } }));

const oggi = new Date();
const voce = (giorno, scale) => ({ data: chiave(giorno), scale, toggle: {}, testi: {} });

function apri(ruolo = 'PAZIENTE') {
  salvaSessione({ token: 't', utente: { id: 'u', username: 'laura', nome: 'Laura', ruolo } });
  render(
    <ProviderAutenticazione>
      <MemoryRouter><PaginaHome /></MemoryRouter>
    </ProviderAutenticazione>,
  );
}

describe('PaginaHome', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('senza diary di oggi invita a compilarla e dice che ieri non c\'è', async () => {
    diarioApi.intervallo.mockResolvedValue([]);
    apri();
    expect(screen.getByRole('heading', { name: 'Laura' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Compila la diary' })).toBeInTheDocument();
    expect(await screen.findByText('Nessuna diary ieri.')).toBeInTheDocument();
    expect(screen.getByText('Ultimi 7 giorni')).toBeInTheDocument();
  });

  it('con la diary di oggi e di ieri mostra serie, emozioni di ieri e "Rivedi"', async () => {
    diarioApi.intervallo.mockResolvedValue([
      voce(oggi, { sp: 4, ser: 2 }),
      voce(aggiungiGiorni(oggi, -1), { tri: 4, rab: 2 }),
    ]);
    apri();
    expect(await screen.findByRole('button', { name: 'Rivedi la diary' })).toBeInTheDocument();
    expect(screen.getByText('Tristezza')).toBeInTheDocument();
    expect(screen.getByText(/giorni\s*di fila/).closest('div').textContent).toMatch(/^2/);
    // con pensieri suicidari alti il suggerimento è TIP
    expect(screen.getByText(/TIP — cambia la chimica del corpo/)).toBeInTheDocument();
  });

  it('"Altro" passa al suggerimento successivo e se ne ricorda', async () => {
    diarioApi.intervallo.mockResolvedValue([voce(oggi, { sp: 4 })]);
    apri();
    await screen.findByText(/TIP — cambia la chimica del corpo/);
    await userEvent.click(screen.getByRole('button', { name: /Altro/ }));
    await waitFor(() => expect(screen.queryByText(/TIP — cambia la chimica del corpo/)).not.toBeInTheDocument());
    expect(localStorage.getItem(`marea:suggerimento:${chiave(oggi)}`)).toBe('1');
  });

  it('la terapeuta vede la sua home', () => {
    diarioApi.intervallo.mockResolvedValue([]);
    apri('TERAPEUTA');
    expect(screen.getByText('Le tue pazienti ti aspettano.')).toBeInTheDocument();
    expect(diarioApi.intervallo).not.toHaveBeenCalled();
  });
});
