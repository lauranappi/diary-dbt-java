import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { salvaSessione } from '../../api/sessione.js';
import { EMOZIONI } from '../../contenuti/emozioni.js';
import PaginaEmozione from './PaginaEmozione.jsx';
import PaginaEmozioni from './PaginaEmozioni.jsx';

vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn().mockResolvedValue(null), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

function apri(percorso) {
  render(
    <MemoryRouter initialEntries={[percorso]}>
      <Routes>
        <Route path="/emozioni" element={<PaginaEmozioni />} />
        <Route path="/emozioni/:id" element={<PaginaEmozione />} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => { localStorage.clear(); salvaSessione({ token: 't', utente: { id: 'u1', ruolo: 'PAZIENTE' } }); });

describe('emozioni', () => {
  it('sono sette, con gli id di Marea, e ognuna ha le sei sezioni', () => {
    expect(EMOZIONI.map((e) => e.id)).toEqual(['epau', 'erab', 'etri', 'ecol', 'egel', 'einv', 'ever']);
    for (const e of EMOZIONI) expect(e.sezioni.map((s) => s.titolo)).toHaveLength(6);
  });

  it('l\'elenco porta a ogni emozione', () => {
    apri('/emozioni');
    expect(screen.getByRole('link', { name: /Vergogna/ })).toHaveAttribute('href', '/emozioni/ever');
    expect(screen.getAllByRole('link', { name: /Quando/ }).length).toBeGreaterThanOrEqual(7);
  });

  it('una emozione mostra l\'azione opposta e gli appunti della paziente', () => {
    apri('/emozioni/erab');
    expect(screen.getByRole('heading', { name: 'Rabbia' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Azione opposta' })).toHaveTextContent('Evita con grazia');
    expect(screen.getByRole('region', { name: 'Appunti sull’emozione' })).toBeInTheDocument();
  });

  it('una emozione che non esiste riporta all\'elenco', () => {
    apri('/emozioni/xx');
    expect(screen.getByRole('link', { name: /Paura/ })).toBeInTheDocument();
  });
});
