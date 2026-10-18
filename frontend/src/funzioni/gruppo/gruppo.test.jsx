import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { documentiApi } from '../../api/documenti.js';
import { salvaSessione } from '../../api/sessione.js';
import PaginaFormIncontro from './PaginaFormIncontro.jsx';
import PaginaGruppo from './PaginaGruppo.jsx';
import PaginaIncontro from './PaginaIncontro.jsx';

vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn(), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

const Posizione = () => <p data-testid="percorso">{useLocation().pathname + useLocation().search}</p>;

function apri(percorso) {
  render(
    <MemoryRouter initialEntries={[percorso]}>
      <Posizione />
      <Routes>
        <Route path="/gruppo" element={<PaginaGruppo />} />
        <Route path="/gruppo/nuovo" element={<PaginaFormIncontro />} />
        <Route path="/gruppo/:id" element={<PaginaIncontro />} />
        <Route path="/gruppo/:id/modifica" element={<PaginaFormIncontro />} />
        <Route path="/fogli/:id" element={<p>Pagina del foglio</p>} />
        <Route path="/guida/:modulo" element={<p>Pagina del modulo</p>} />
      </Routes>
    </MemoryRouter>,
  );
}

const esistente = { id: 'g1', g: '2026-10-05', pp: [{ p: '60', t: 'Mente saggia', l: 'gs:mind-1' }, { p: '250', t: 'Controlla i fatti', l: 'fg:r-controlla-fatti' }], mm: ['mind', 'reg'], ts: 5 };
const contenuto = {
  'grp:pagine': [esistente, { id: 'g0', g: '2026-09-28', pp: [{ p: '380', t: 'TIP' }], mm: ['tol'], ts: 1 }, { id: 'gx', g: '2026-09-01', pp: [], ts: 9, d: 1 }],
  'gn:g1': [{ id: 'n1', t: 'Respirare dal diaframma', c: 0, ts: 3 }],
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  salvaSessione({ token: 't', utente: { id: 'u1', ruolo: 'PAZIENTE' } });
  documentiApi.leggi.mockResolvedValue({ contenuto, versione: 1 });
});

const salvato = async () => {
  await waitFor(() => expect(documentiApi.salva).toHaveBeenCalled(), { timeout: 3000 });
  return documentiApi.salva.mock.calls.at(-1)[1];
};

describe('Diario del gruppo', () => {
  it('elenca gli incontri dal più recente, senza quelli cancellati, e li cerca anche per appunto', async () => {
    apri('/gruppo');
    expect(await screen.findByText(/Mente saggia · Controlla i fatti/)).toBeInTheDocument();
    expect(screen.getByText('TIP')).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThanOrEqual(2);
    await userEvent.type(screen.getByLabelText('Cerca negli incontri'), 'diaframma');
    expect(screen.getByText(/Mente saggia/)).toBeInTheDocument();
    expect(screen.queryByText('TIP')).not.toBeInTheDocument();
  });

  it('senza incontri invita ad aggiungerne uno', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    apri('/gruppo');
    expect(await screen.findByText(/Ancora nessun incontro/)).toBeInTheDocument();
  });

  it('l\'incontro mostra le pagine, i collegamenti che portano a schede e fogli e gli appunti', async () => {
    apri('/gruppo/g1');
    expect(await screen.findByText('p. 60 · Mente saggia')).toBeInTheDocument();
    expect(screen.getByText('Mindfulness, Regolazione emotiva')).toBeInTheDocument();
    expect(screen.getByText('Respirare dal diaframma')).toBeInTheDocument();
    const foglio = screen.getByRole('link', { name: /Apri il foglio: Controlla i fatti/ });
    expect(foglio).toHaveAttribute('href', '/fogli/r-controlla-fatti');
    expect(screen.getByRole('link', { name: /Apri la scheda:/ }).getAttribute('href')).toMatch(/^\/guida\/mind\?scheda=mind-1$/);
  });

  it('si elimina con conferma, togliendo anche i post-it dell\'incontro', async () => {
    apri('/gruppo/g1');
    await screen.findByText('p. 60 · Mente saggia');
    await userEvent.click(screen.getByRole('button', { name: 'Elimina' }));
    await userEvent.click(screen.getByRole('button', { name: 'Eliminare davvero?' }));
    expect(screen.getByTestId('percorso')).toHaveTextContent('/gruppo');
    const doc = await salvato();
    expect(doc['grp:pagine'].find((x) => x.id === 'g1')).toMatchObject({ d: 1, pp: [] });
    expect(doc['gn:g1'][0]).toMatchObject({ d: 1, t: '' });
  });

  it('si aggiunge un incontro: pagina, titolo collegato a una scheda, ambito ricavato, appunto', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    apri('/gruppo/nuovo');
    await userEvent.type(screen.getByLabelText('Numero di pagina'), '250');
    await userEvent.type(screen.getByLabelText('Titolo della pagina'), 'controlla i fatti');
    const suggerimenti = await screen.findAllByRole('button', { name: /Foglio vuoto|Scheda|Compilato/ });
    await userEvent.click(suggerimenti.find((b) => within(b).queryByText('Foglio vuoto')));
    expect(screen.getByText(/Collegata: Controlla i fatti/)).toBeInTheDocument();
    expect(screen.getByText('Ambito: Regolazione emotiva')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    expect(screen.getByTestId('percorso').textContent).toMatch(/^\/gruppo\/g/);
    const doc = await salvato();
    expect(doc['grp:pagine']).toHaveLength(1);
    expect(doc['grp:pagine'][0]).toMatchObject({ pp: [{ p: '250', t: 'Controlla i fatti', l: 'fg:r-controlla-fatti' }], mm: ['reg'] });
  });

  it('un incontro vuoto non si salva', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    apri('/gruppo/nuovo');
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Scrivi almeno una pagina o un appunto.');
    expect(screen.getByTestId('percorso')).toHaveTextContent('/gruppo/nuovo');
  });

  it('si modifica un incontro esistente', async () => {
    apri('/gruppo/g1/modifica');
    const numeri = await screen.findAllByLabelText('Numero di pagina');
    expect(numeri[0]).toHaveValue('60');
    await userEvent.clear(numeri[0]);
    await userEvent.type(numeri[0], '70');
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    const doc = await salvato();
    const x = doc['grp:pagine'].find((i) => i.id === 'g1');
    expect(x.pp[0].p).toBe('70');
    expect(doc['grp:pagine'].filter((i) => !i.d)).toHaveLength(2);
  });
});
