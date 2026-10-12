import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { autenticazioneApi } from '../../api/autenticazione.js';
import PaginaRegistrati from './PaginaRegistrati.jsx';
import { ProviderAutenticazione } from './ProviderAutenticazione.jsx';

vi.mock('../../api/autenticazione.js', () => ({
  autenticazioneApi: { accedi: vi.fn(), registra: vi.fn() },
}));

function mostra() {
  render(
    <ProviderAutenticazione>
      <MemoryRouter initialEntries={['/registrati']}>
        <Routes>
          <Route path="/registrati" element={<PaginaRegistrati />} />
          <Route path="/" element={<p>Home</p>} />
        </Routes>
      </MemoryRouter>
    </ProviderAutenticazione>,
  );
}

describe('PaginaRegistrati', () => {
  beforeEach(() => vi.clearAllMocks());

  it('invia i dati della paziente con il codice della terapeuta', async () => {
    autenticazioneApi.registra.mockResolvedValue({ token: 't', utenteId: 'u', username: 'maria', ruolo: 'PAZIENTE' });
    mostra();
    const u = userEvent.setup();
    await u.type(screen.getByLabelText('Nome'), 'Maria');
    await u.type(screen.getByLabelText('Cognome'), 'Rossi');
    await u.type(screen.getByLabelText('Email'), 'maria@esempio.it');
    await u.type(screen.getByLabelText('Username'), 'Maria.Rossi');
    await u.type(screen.getByLabelText('Password'), 'passwordsicura');
    await u.type(screen.getByLabelText(/Codice della terapeuta/), 'dott.bianchi');
    await u.click(screen.getByRole('button', { name: 'Crea account' }));

    expect(await screen.findByText('Home')).toBeInTheDocument();
    expect(autenticazioneApi.registra).toHaveBeenCalledWith({
      ruolo: 'PAZIENTE', nome: 'Maria', cognome: 'Rossi', email: 'maria@esempio.it',
      username: 'maria.rossi', password: 'passwordsicura', codiceTerapeuta: 'dott.bianchi',
    });
  });

  it('una terapeuta non vede il campo del codice terapeuta', async () => {
    mostra();
    await userEvent.click(screen.getByRole('button', { name: 'Sono una terapeuta' }));
    expect(screen.queryByLabelText(/Codice della terapeuta/)).not.toBeInTheDocument();
  });

  it('mostra l\'errore del server', async () => {
    autenticazioneApi.registra.mockRejectedValue(new Error('Username già in uso'));
    mostra();
    const u = userEvent.setup();
    await u.type(screen.getByLabelText('Username'), 'maria');
    await u.type(screen.getByLabelText('Password'), 'passwordsicura');
    await u.click(screen.getByRole('button', { name: 'Crea account' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Username già in uso');
  });
});
