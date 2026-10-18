import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { salvaSessione } from '../../api/sessione.js';
import { terapeutaApi } from '../../api/terapeuta.js';
import { ProviderAutenticazione } from '../autenticazione/ProviderAutenticazione.jsx';
import { chiave } from '../diario/date.js';
import HomeTerapeuta from './HomeTerapeuta.jsx';

vi.mock('../../api/terapeuta.js', () => ({ terapeutaApi: { pazienti: vi.fn(), voci: vi.fn() } }));

const oggi = chiave(new Date());

function apri() {
  salvaSessione({ token: 't', utente: { id: 't1', username: 'dott.bianchi', nome: 'Bianca', cognome: 'Bianchi', ruolo: 'TERAPEUTA' } });
  render(
    <ProviderAutenticazione>
      <MemoryRouter><HomeTerapeuta /></MemoryRouter>
    </ProviderAutenticazione>,
  );
}

beforeEach(() => { vi.clearAllMocks(); localStorage.clear(); });

describe('home della terapeuta', () => {
  it('mostra quante pazienti, chi ha compilato oggi, lo username e le segnalazioni che portano alla paziente', async () => {
    terapeutaApi.pazienti.mockResolvedValue([{ id: 'p1', username: 'anna', nome: 'Anna', cognome: 'Rossi' }, { id: 'p2', username: 'bea', nome: 'Bea', cognome: 'Verdi' }]);
    terapeutaApi.voci.mockImplementation(async (id) => (id === 'p1'
      ? [{ data: oggi, scale: { ser: 3 }, toggle: { sa: 'Sì' } }]
      : [{ data: oggi, scale: {} }]));
    apri();
    expect(screen.getByRole('heading', { name: 'Dott.ssa Bianchi' })).toBeInTheDocument();
    expect(await screen.findByText('2 pazienti · 1 ha compilato oggi')).toBeInTheDocument();
    expect(screen.getByText('dott.bianchi')).toBeInTheDocument();
    const segnalazione = screen.getByRole('link', { name: /Anna Rossi/ });
    expect(segnalazione).toHaveAttribute('href', '/pazienti/p1');
    expect(within(segnalazione).getByText(/azione suicidaria/)).toBeInTheDocument();
    expect(screen.getByText('1 riga')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Impostazioni' })).toBeInTheDocument();
  });

  it('senza segnalazioni lo dice; se una paziente non risponde le altre si vedono', async () => {
    terapeutaApi.pazienti.mockResolvedValue([{ id: 'p1', username: 'anna', nome: 'Anna', cognome: 'Rossi' }, { id: 'p2', username: 'bea', nome: 'Bea', cognome: 'Verdi' }]);
    terapeutaApi.voci.mockImplementation(async (id) => { if (id === 'p2') throw new Error('x'); return [{ data: oggi, scale: { ser: 1 } }]; });
    apri();
    expect(await screen.findByText('Nessuna segnalazione negli ultimi sette giorni.')).toBeInTheDocument();
    expect(screen.getByText('2 pazienti · 1 ha compilato oggi')).toBeInTheDocument();
  });

  it('se il server non risponde avvisa', async () => {
    terapeutaApi.pazienti.mockRejectedValue(new Error('x'));
    apri();
    expect(await screen.findByRole('alert')).toHaveTextContent('Dati non disponibili');
  });
});
