import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { documentiApi } from '../../api/documenti.js';
import { salvaSessione } from '../../api/sessione.js';
import PaginaFoglio from './PaginaFoglio.jsx';
import PaginaFogli from './PaginaFogli.jsx';

vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn(), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

function apri(percorso) {
  render(
    <MemoryRouter initialEntries={[percorso]}>
      <Routes>
        <Route path="/fogli" element={<PaginaFogli />} />
        <Route path="/fogli/:id" element={<PaginaFoglio />} />
      </Routes>
    </MemoryRouter>,
  );
}

const compilato = { id: 'a1', ts: Date.UTC(2026, 9, 1), v: { ev: 'Una discussione' } };

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  salvaSessione({ token: 't', utente: { id: 'u1', ruolo: 'PAZIENTE' } });
  documentiApi.leggi.mockResolvedValue({ contenuto: { generici: { 't-stop': [compilato] } }, versione: 3 });
});

describe('fogli di lavoro', () => {
  it('l\'elenco ha i quattro moduli e mostra quanti fogli hai compilato', async () => {
    apri('/fogli');
    for (const m of ['Mindfulness', 'Regolazione emotiva', 'Efficacia interpersonale', 'Tolleranza della sofferenza']) {
      expect(screen.getByRole('region', { name: m })).toBeInTheDocument();
    }
    expect(await screen.findByLabelText('1 compilati')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Praticare l’abilità STOP/ })).toHaveAttribute('href', '/fogli/t-stop');
  });

  it('si compila un foglio nuovo e si salva nel documento "fogli"', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    apri('/fogli/t-stop');
    await userEvent.click(screen.getByRole('button', { name: '+ Nuovo foglio' }));
    await userEvent.type(screen.getByLabelText(/Evento scatenante/), 'Litigio');
    await userEvent.type(screen.getByLabelText('Livello di sofferenza prima (0-100)'), '150');
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    expect(await screen.findByText('Compilati')).toBeInTheDocument();
    await waitFor(() => expect(documentiApi.salva).toHaveBeenCalled(), { timeout: 3000 });
    const [chiave, contenuto] = documentiApi.salva.mock.calls.at(-1);
    expect(chiave).toBe('fogli');
    const [voce] = contenuto.generici['t-stop'];
    expect(voce.v).toEqual({ ev: 'Litigio', prima: 100 });
    expect(voce.id).toBeTruthy();
  });

  it('un foglio vuoto non viene salvato', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    apri('/fogli/t-stop');
    await userEvent.click(screen.getByRole('button', { name: '+ Nuovo foglio' }));
    await userEvent.click(screen.getByRole('button', { name: 'Salva' }));
    expect(screen.queryByText('Compilati')).not.toBeInTheDocument();
  });

  it('si riapre un foglio compilato, si modifica e si elimina con conferma', async () => {
    apri('/fogli/t-stop');
    await userEvent.click(await screen.findByText('Una discussione'));
    const campo = screen.getByLabelText(/Evento scatenante/);
    expect(campo).toHaveValue('Una discussione');
    await userEvent.click(screen.getByRole('button', { name: 'Elimina' }));
    await userEvent.click(screen.getByRole('button', { name: 'Eliminare davvero?' }));
    expect(screen.queryByText('Una discussione')).not.toBeInTheDocument();
    await waitFor(() => expect(documentiApi.salva).toHaveBeenCalled(), { timeout: 3000 });
    const contenuto = documentiApi.salva.mock.calls.at(-1)[1];
    expect(contenuto.generici['t-stop'] ?? []).toEqual([]);
    expect(Object.keys(contenuto.cancellati)).toEqual(['t-stop:a1']);
  });

  it('i campi a scelta si accendono e si spengono', async () => {
    documentiApi.leggi.mockResolvedValue(null);
    apri('/fogli/m-piacevoli');
    await userEvent.click(screen.getByRole('button', { name: '+ Nuovo foglio' }));
    const gruppo = screen.getByRole('group', { name: 'Eri consapevole delle sensazioni piacevoli mentre l’evento accadeva?' });
    const osserva = within(gruppo).getByRole('button', { name: 'Sì' });
    await userEvent.click(osserva);
    expect(osserva).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(within(gruppo).getByRole('button', { name: 'No' }));
    expect(osserva).toHaveAttribute('aria-pressed', 'false');
  });

  it('un foglio che non esiste avvisa', () => {
    apri('/fogli/xx');
    expect(screen.getByRole('alert')).toHaveTextContent('Questo foglio non esiste.');
  });
});
