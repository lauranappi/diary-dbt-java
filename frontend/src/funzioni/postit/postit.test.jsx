import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { documentiApi } from '../../api/documenti.js';
import { salvaSessione } from '../../api/sessione.js';
import Postit from './Postit.jsx';

vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn(), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  salvaSessione({ token: 't', utente: { id: 'u1', ruolo: 'PAZIENTE' } });
  documentiApi.leggi.mockResolvedValue(null);
});

const ultimoSalvato = async () => {
  await waitFor(() => expect(documentiApi.salva).toHaveBeenCalled(), { timeout: 3000 });
  return documentiApi.salva.mock.calls.at(-1);
};

describe('post-it', () => {
  it('senza appunti invita a scriverne uno', () => {
    render(<Postit chiave="mod:reg" />);
    expect(screen.getByText(/Nessun appunto/)).toBeInTheDocument();
  });

  it('se ne scrive uno, si sceglie il colore e si salva nel documento "post-it"', async () => {
    render(<Postit chiave="mod:reg" />);
    await userEvent.click(screen.getByRole('button', { name: 'Aggiungi un post-it' }));
    await userEvent.type(screen.getByLabelText('Testo del post-it'), 'Validare');
    await userEvent.click(screen.getByRole('radio', { name: 'Menta' }));
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText('Validare')).toBeInTheDocument();
    const [chiave, contenuto] = await ultimoSalvato();
    expect(chiave).toBe('post-it');
    expect(contenuto['mod:reg']).toHaveLength(1);
    expect(contenuto['mod:reg'][0]).toMatchObject({ t: 'Validare', c: 2 });
  });

  it('i simboli rapidi e l\'elenco puntato si inseriscono nel testo', async () => {
    render(<Postit chiave="mod:reg" />);
    await userEvent.click(screen.getByRole('button', { name: 'Aggiungi un post-it' }));
    const campo = screen.getByLabelText('Testo del post-it');
    await userEvent.type(campo, 'a');
    await userEvent.click(screen.getByRole('button', { name: 'Freccia a destra' }));
    await userEvent.click(screen.getByRole('button', { name: 'Elenco puntato' }));
    expect(campo.value).toContain('→ ');
    expect(campo.value.startsWith('• ')).toBe(true);
  });

  it('un post-it esistente si apre in lettura, si modifica e si elimina con conferma', async () => {
    documentiApi.leggi.mockResolvedValue({ contenuto: { 'mod:reg': [{ id: 'p1', t: 'Vecchio', c: 0, ts: Date.now() - 1000 }] }, versione: 1 });
    render(<Postit chiave="mod:reg" />);
    await userEvent.click(await screen.findByText('Vecchio'));
    const campo = screen.getByLabelText('Testo del post-it');
    expect(campo).toHaveAttribute('readonly');
    await userEvent.click(screen.getByRole('button', { name: 'Modifica' }));
    await userEvent.type(campo, ' e nuovo');
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    expect(screen.getByText('Vecchio e nuovo')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Vecchio e nuovo'));
    await userEvent.click(screen.getByRole('button', { name: 'Elimina' }));
    await userEvent.click(screen.getByRole('button', { name: 'Eliminare davvero?' }));
    expect(screen.queryByText('Vecchio e nuovo')).not.toBeInTheDocument();
    const [, contenuto] = await ultimoSalvato();
    expect(contenuto['mod:reg'][0]).toMatchObject({ id: 'p1', d: 1, t: '' });
  });

  it('svuotare un post-it esistente equivale a toglierlo', async () => {
    documentiApi.leggi.mockResolvedValue({ contenuto: { 'fg:t-stop': [{ id: 'p1', t: 'Da togliere', c: 1, ts: 1 }] }, versione: 1 });
    render(<Postit chiave="fg:t-stop" titolo="Note per compilarlo" />);
    await userEvent.click(await screen.findByText('Da togliere'));
    await userEvent.click(screen.getByRole('button', { name: 'Modifica' }));
    await userEvent.clear(screen.getByLabelText('Testo del post-it'));
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    expect(within(screen.getByRole('region', { name: 'Note per compilarlo' })).getByText(/Nessun appunto/)).toBeInTheDocument();
  });
});

describe('pagina appunti', () => {
  it('raccoglie i post-it per modulo e foglio, anche quelli importati', async () => {
    const { default: PaginaAppunti } = await import('./PaginaAppunti.jsx');
    const { MemoryRouter } = await import('react-router-dom');
    documentiApi.leggi.mockResolvedValue({
      contenuto: {
        'mod:reg': [{ id: 'a', t: 'Sul modulo', c: 0, ts: 3 }],
        'fg:t-stop': [{ id: 'b', t: 'Sul foglio', c: 1, ts: 2 }],
        'sk:tcrisi': [{ id: 'c', t: 'Da Marea', c: 2, ts: 1 }],
        'mod:mind': [{ id: 'd', t: '', c: 0, ts: 4, d: 1 }],
      },
      versione: 1,
    });
    render(<MemoryRouter><PaginaAppunti /></MemoryRouter>);
    expect(await screen.findByText('Sul modulo')).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Regolazione emotiva' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Praticare l’abilità STOP' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Altri appunti' })).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Mindfulness' })).not.toBeInTheDocument();
  });
});
