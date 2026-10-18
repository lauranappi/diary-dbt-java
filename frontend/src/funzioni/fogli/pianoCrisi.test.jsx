import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { documentiApi } from '../../api/documenti.js';
import { salvaSessione } from '../../api/sessione.js';
import VistaPianoCrisi from '../pazienti/VistaPianoCrisi.jsx';
import PaginaPianoCrisi from './PaginaPianoCrisi.jsx';

vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn(), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  salvaSessione({ token: 't', utente: { id: 'u1', ruolo: 'PAZIENTE' } });
});

describe('piano di crisi', () => {
  it('mostra quello salvato, si modifica e si salva nel documento "fogli" senza perdere il resto', async () => {
    documentiApi.leggi.mockResolvedValue({ contenuto: { generici: { 't-stop': [{ id: 'a', ts: 5, v: { ev: 'x' } }] }, pianoCrisi: { a1: 'Respirare', motivi: 'Il mio cane' } }, versione: 2 });
    render(<MemoryRouter><PaginaPianoCrisi /></MemoryRouter>);
    expect(await screen.findByDisplayValue('Respirare')).toBeInTheDocument();
    expect(screen.getByText(/Telefono Amico:/)).toBeInTheDocument();
    await userEvent.type(screen.getByLabelText('Persone di fiducia 1'), 'Sara 333');
    await userEvent.click(screen.getByRole('button', { name: 'Salva il piano' }));
    expect(screen.getByText(/Piano salvato/)).toBeInTheDocument();
    await waitFor(() => expect(documentiApi.salva).toHaveBeenCalled(), { timeout: 3000 });
    const [chiave, contenuto] = documentiApi.salva.mock.calls.at(-1);
    expect(chiave).toBe('fogli');
    expect(contenuto.pianoCrisi).toMatchObject({ a1: 'Respirare', p1: 'Sara 333', motivi: 'Il mio cane' });
    expect(contenuto.generici['t-stop']).toHaveLength(1);
  });

  it('la terapeuta legge solo le parti compilate', () => {
    render(<VistaPianoCrisi piano={{ segnali: 'Mi isolo', a1: 'Respirare', a2: '', p1: '' }} />);
    expect(screen.getByText('Mi isolo')).toBeInTheDocument();
    expect(screen.getByText('Respirare')).toBeInTheDocument();
    expect(screen.queryByText('Persone di fiducia')).not.toBeInTheDocument();
    expect(screen.queryByText('Motivi per cui vale la pena')).not.toBeInTheDocument();
  });
});
