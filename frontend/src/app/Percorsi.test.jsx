import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { salvaSessione } from '../api/sessione.js';
import { ProviderAutenticazione } from '../funzioni/autenticazione/ProviderAutenticazione.jsx';
import Percorsi from './Percorsi.jsx';

vi.mock('../api/terapeuta.js', () => ({ terapeutaApi: { pazienti: vi.fn().mockResolvedValue([]), voci: vi.fn().mockResolvedValue([]), documenti: vi.fn().mockResolvedValue({}) } }));

function apri(percorso) {
  render(
    <ProviderAutenticazione>
      <MemoryRouter initialEntries={[percorso]}>
        <Percorsi />
      </MemoryRouter>
    </ProviderAutenticazione>,
  );
}

const sessione = (ruolo) => salvaSessione({
  token: 't',
  utente: { id: 'u', username: 'laura', nome: 'Laura', ruolo, codicePaziente: 'ABC234' },
});

describe('Percorsi', () => {
  it('senza accesso porta alla pagina di login', () => {
    apri('/diario');
    expect(screen.getByRole('heading', { name: 'Bentornata' })).toBeInTheDocument();
  });

  it('la paziente vede la home con le sei voci della barra', () => {
    sessione('PAZIENTE');
    apri('/');
    expect(screen.getByRole('heading', { name: /Laura/ })).toBeInTheDocument();
    const barra = screen.getByRole('navigation', { name: 'Navigazione principale' });
    expect([...barra.querySelectorAll('a')].map((a) => a.textContent))
      .toEqual(['Home', 'Diary', 'Guida', 'Abilità', 'Storico', 'Attività']);
  });

  it('la terapeuta vede Home, Pazienti e Guida', () => {
    sessione('TERAPEUTA');
    apri('/');
    const barra = screen.getByRole('navigation', { name: 'Navigazione principale' });
    expect([...barra.querySelectorAll('a')].map((a) => a.textContent)).toEqual(['Home', 'Pazienti', 'Guida']);
  });

  it('una paziente non entra nella sezione delle terapeute', () => {
    sessione('PAZIENTE');
    apri('/pazienti');
    expect(screen.getByRole('heading', { name: /Laura/ })).toBeInTheDocument(); // rimandata alla home
  });

  it('la terapeuta apre l\'elenco delle pazienti', async () => {
    sessione('TERAPEUTA');
    apri('/pazienti');
    expect(await screen.findByText(/Nessuna paziente ti ha ancora aggiunto/)).toBeInTheDocument();
  });
});
