import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { autenticazioneApi } from '../../api/autenticazione.js';
import { leggiSessione } from '../../api/sessione.js';
import PaginaAccedi from './PaginaAccedi.jsx';
import { ProviderAutenticazione } from './ProviderAutenticazione.jsx';

vi.mock('../../api/autenticazione.js', () => ({
  autenticazioneApi: { accedi: vi.fn(), registra: vi.fn() },
}));

function mostra() {
  render(
    <ProviderAutenticazione>
      <MemoryRouter initialEntries={['/accedi']}>
        <Routes>
          <Route path="/accedi" element={<PaginaAccedi />} />
          <Route path="/" element={<p>Home</p>} />
          <Route path="/registrati" element={<p>Registrazione</p>} />
        </Routes>
      </MemoryRouter>
    </ProviderAutenticazione>,
  );
}

describe('PaginaAccedi', () => {
  beforeEach(() => vi.clearAllMocks());

  it('con credenziali giuste salva la sessione e porta alla home', async () => {
    autenticazioneApi.accedi.mockResolvedValue({
      token: 'tk', utenteId: 'u1', username: 'maria', ruolo: 'PAZIENTE', nome: 'Maria', codicePaziente: 'ABC234',
    });
    mostra();
    const utente = userEvent.setup();
    await utente.type(screen.getByLabelText('Email o username'), 'maria@esempio.it');
    await utente.type(screen.getByLabelText('Password'), 'passwordsicura');
    await utente.click(screen.getByRole('button', { name: 'Accedi' }));

    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(autenticazioneApi.accedi).toHaveBeenCalledWith('maria@esempio.it', 'passwordsicura');
    expect(leggiSessione()).toMatchObject({ token: 'tk', utente: { id: 'u1', nome: 'Maria' } });
  });

  it('con credenziali sbagliate mostra il messaggio del server e resta sulla pagina', async () => {
    autenticazioneApi.accedi.mockRejectedValue(new Error('Credenziali non valide'));
    mostra();
    const utente = userEvent.setup();
    await utente.type(screen.getByLabelText('Email o username'), 'maria');
    await utente.type(screen.getByLabelText('Password'), 'sbagliata');
    await utente.click(screen.getByRole('button', { name: 'Accedi' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Credenziali non valide');
    expect(leggiSessione()).toBeNull();
  });

  it('il collegamento porta alla registrazione', async () => {
    mostra();
    await userEvent.click(screen.getByRole('link', { name: /Registrati/ }));
    await waitFor(() => expect(screen.getByText('Registrazione')).toBeInTheDocument());
  });

  it('"password dimenticata" spiega che il recupero non e\' ancora attivo', async () => {
    mostra();
    await userEvent.click(screen.getByRole('button', { name: /dimenticata/ }));
    expect(screen.getByText(/non è ancora attivo/)).toBeInTheDocument();
  });
});
