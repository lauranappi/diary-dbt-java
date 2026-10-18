import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { documentiApi } from '../../api/documenti.js';
import { salvaSessione } from '../../api/sessione.js';
import { terapeutaApi } from '../../api/terapeuta.js';
import { ProviderAutenticazione } from '../autenticazione/ProviderAutenticazione.jsx';
import { chiave } from '../diario/date.js';
import PaginaPaziente from './PaginaPaziente.jsx';
import PaginaPazienti from './PaginaPazienti.jsx';

vi.mock('../../api/terapeuta.js', () => ({ terapeutaApi: { pazienti: vi.fn(), voci: vi.fn(), documenti: vi.fn() } }));
vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn().mockResolvedValue(null), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

const oggi = chiave(new Date());
const anna = { id: 'p1', username: 'anna', nome: 'Anna', cognome: 'Rossi', giorniCompilati: 12, ultimoGiorno: '2026-10-14' };

function apri(percorso) {
  render(
    <ProviderAutenticazione>
      <MemoryRouter initialEntries={[percorso]}>
        <Routes>
          <Route path="/pazienti" element={<PaginaPazienti />} />
          <Route path="/pazienti/:id" element={<PaginaPaziente />} />
        </Routes>
      </MemoryRouter>
    </ProviderAutenticazione>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  salvaSessione({ token: 't', utente: { id: 't1', username: 'dott.bianchi', nome: 'Bianca', ruolo: 'TERAPEUTA' } });
  terapeutaApi.pazienti.mockResolvedValue([anna]);
  terapeutaApi.voci.mockResolvedValue([
    { data: oggi, scale: { sp: 3, ser: 4 }, toggle: { sa: 'Sì' }, testi: {}, abilitaUsate: {}, planner: {} },
    { data: '2025-01-15', scale: { ser: 1 }, toggle: {}, testi: { alcu: 'vino' } },
  ]);
  documentiApi.leggi.mockResolvedValue(null);
});

describe('elenco pazienti', () => {
  it('mostra nome, username, giorni compilati e ultimo aggiornamento', async () => {
    apri('/pazienti');
    const riga = await screen.findByRole('link', { name: /Anna Rossi/ });
    expect(riga).toHaveAttribute('href', '/pazienti/p1');
    expect(within(riga).getByText(/@anna · 12 giorni · aggiornato 14 ott/)).toBeInTheDocument();
  });

  it('senza pazienti ricorda lo username da comunicare', async () => {
    terapeutaApi.pazienti.mockResolvedValue([]);
    apri('/pazienti');
    expect(await screen.findByText(/Nessuna paziente ti ha ancora aggiunto/)).toBeInTheDocument();
    expect(screen.getByText('dott.bianchi')).toBeInTheDocument();
  });

  it('se il server non risponde avvisa', async () => {
    terapeutaApi.pazienti.mockRejectedValue(new Error('x'));
    apri('/pazienti');
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  });
});

describe('scheda paziente', () => {
  it('la panoramica conta i giorni e le azioni del periodo e legge il diario della paziente giusta', async () => {
    apri('/pazienti/p1');
    expect(await screen.findByText('Az. suicidarie')).toBeInTheDocument();
    expect(terapeutaApi.voci).toHaveBeenCalledWith('p1', '2020-01-01', oggi);
    expect(screen.getByText('Az. suicidarie').previousSibling).toHaveTextContent('1');
  });

  it('nello storico si apre il dettaglio di un giorno e con "Tutti" compaiono i più vecchi', async () => {
    apri('/pazienti/p1');
    await screen.findByText('Az. suicidarie');
    await userEvent.click(screen.getByRole('button', { name: 'Storico' }));
    expect(screen.queryByText('vino')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Tutti' }));
    expect(screen.getByText('vino')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Pensieri suic. 3'));
    expect(within(screen.getByRole('dialog')).getByText('Comportamenti e sostanze')).toBeInTheDocument();
  });

  it('la vista Trend mostra i grafici', async () => {
    apri('/pazienti/p1');
    await screen.findByText('Az. suicidarie');
    await userEvent.click(screen.getByRole('button', { name: 'Trend' }));
    expect(screen.getByText('Emozioni positive')).toBeInTheDocument();
  });

  it('le note si scrivono per paziente e vengono salvate nel documento della terapeuta', async () => {
    apri('/pazienti/p1');
    await screen.findByText('Az. suicidarie');
    await userEvent.click(screen.getByRole('button', { name: 'Note' }));
    const campo = screen.getByLabelText('Le tue note (private)');
    await userEvent.type(campo, 'ok');
    expect(campo).toHaveValue('ok');
    await waitFor(() => expect(documentiApi.salva).toHaveBeenCalledWith('note-paziente', { note: { anna: 'ok' } }, 0), { timeout: 3000 });
  });

  it('la vista Abilità conta le spunte e la vista Giornata mostra il piano', async () => {
    terapeutaApi.voci.mockResolvedValue([
      { data: oggi, abilitaUsate: { 'sk_Tolleranza della sofferenza_TIP': true }, planner: { mattina: ['Passeggiata'], pomeriggio: [], sera: [] } },
    ]);
    apri('/pazienti/p1');
    await screen.findByText('Az. suicidarie');
    await userEvent.click(screen.getByRole('button', { name: 'Abilità' }));
    expect(screen.getByText('TIP')).toBeInTheDocument();
    expect(screen.getByText('1/1')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Giornata' }));
    expect(screen.getByText('Passeggiata')).toBeInTheDocument();
    expect(screen.getByText('Mattina')).toBeInTheDocument();
    expect(screen.queryByText('Sera')).not.toBeInTheDocument();
  });

  it('la vista Fogli mostra quelli compilati e li apre in sola lettura', async () => {
    terapeutaApi.documenti.mockResolvedValue({
      fogli: { contenuto: { generici: { 't-stop': [{ id: 'a', ts: Date.UTC(2026, 9, 1), v: { ev: 'Una discussione', prima: 70 } }] } } },
    });
    apri('/pazienti/p1');
    await screen.findByText('Az. suicidarie');
    await userEvent.click(screen.getByRole('button', { name: 'Fogli' }));
    expect(terapeutaApi.documenti).toHaveBeenCalledWith('p1');
    expect(await screen.findByText('Tolleranza della sofferenza')).toBeInTheDocument();
    await userEvent.click(screen.getByText('Una discussione'));
    const pannello = screen.getByRole('dialog');
    expect(within(pannello).getByLabelText('Livello di sofferenza prima (0-100)')).toBeDisabled();
    expect(within(pannello).queryByRole('button', { name: 'Salva' })).not.toBeInTheDocument();
  });

  it('senza fogli compilati lo dice', async () => {
    terapeutaApi.documenti.mockResolvedValue({});
    apri('/pazienti/p1');
    await screen.findByText('Az. suicidarie');
    await userEvent.click(screen.getByRole('button', { name: 'Fogli' }));
    expect(await screen.findByText('Nessun foglio di lavoro compilato.')).toBeInTheDocument();
  });

  it('una paziente non collegata non si apre', async () => {
    terapeutaApi.pazienti.mockResolvedValue([]);
    apri('/pazienti/altra');
    expect(await screen.findByText('Questa paziente non risulta collegata a te.')).toBeInTheDocument();
  });
});
