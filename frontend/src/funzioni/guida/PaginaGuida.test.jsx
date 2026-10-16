import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { documentiApi } from '../../api/documenti.js';
import { salvaSessione } from '../../api/sessione.js';
import PaginaGuida from './PaginaGuida.jsx';
import PaginaModulo from './PaginaModulo.jsx';

vi.mock('../../api/documenti.js', async (originale) => ({
  ...(await originale()),
  documentiApi: { leggi: vi.fn().mockResolvedValue(null), salva: vi.fn().mockResolvedValue({ versione: 1 }) },
}));

function apri(percorso) {
  render(
    <MemoryRouter initialEntries={[percorso]}>
      <Routes>
        <Route path="/guida" element={<PaginaGuida />} />
        <Route path="/guida/:modulo" element={<PaginaModulo />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('Guida', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    salvaSessione({ token: 't', utente: { id: 'u1' } });
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('elenca i moduli nell\'ordine del manuale', () => {
    apri('/guida');
    const titoli = ['Parte generale', 'Mindfulness', 'Efficacia interpersonale', 'Regolazione emotiva', 'Tolleranza della sofferenza'];
    for (const t of titoli) expect(screen.getByText(t)).toBeInTheDocument();
  });

  it('la ricerca porta ai risultati e mostra modulo e numero di scheda', async () => {
    apri('/guida');
    await userEvent.type(screen.getByRole('searchbox', { name: 'Cerca nella guida' }), 'amorevole');
    expect(await screen.findByText(/Mindfulness · Scheda 8/)).toBeInTheDocument();
    expect(screen.queryByText('Parte generale')).not.toBeInTheDocument();
  });

  it('una ricerca senza risultati lo dice', async () => {
    apri('/guida');
    await userEvent.type(screen.getByRole('searchbox'), 'qwertyzz');
    expect(await screen.findByText(/Nessuna scheda trovata/)).toBeInTheDocument();
  });

  it('nel modulo si apre una scheda e compare il riferimento al manuale', async () => {
    apri('/guida/mind');
    await userEvent.click(screen.getByRole('button', { name: /La mente saggia: stati della mente/ }));
    expect(screen.getByText(/Manuale: Mindfulness · Scheda 3, p\. 50/)).toBeInTheDocument();
    expect(screen.getByText(/Mente razionale\./)).toBeInTheDocument();
  });

  it('con ?scheda= la scheda arriva già aperta', () => {
    apri('/guida/mind?scheda=mind-3a');
    expect(screen.getByText(/Il sassolino nel lago/)).toBeInTheDocument();
  });

  it('DEAR MAN si apre con i sette passi e il riferimento al manuale', async () => {
    apri('/guida/inter?scheda=inter-5');
    expect(screen.getByText(/Manuale: Efficacia interpersonale · Scheda 5, p\. 125/)).toBeInTheDocument();
    for (const passo of ['Descrivi.', 'Esprimi.', 'Afferma.', 'Rinforza.', '(Sii) Mindful.', 'Agisci in modo sicuro.', 'Negozia.']) {
      expect(screen.getByText(passo)).toBeInTheDocument();
    }
  });

  it('le schede senza testo sono segnate "in arrivo" e non si aprono', () => {
    apri('/guida/tol');
    expect(screen.getAllByText('in arrivo').length).toBeGreaterThan(10);
    expect(screen.queryByRole('button', { name: /Aggiungi ai preferiti/ })).not.toBeInTheDocument();
  });

  it('la stella salva il preferito sul server e lo mostra nella Guida', async () => {
    apri('/guida/mind');
    const stelle = screen.getAllByRole('button', { name: 'Aggiungi ai preferiti' });
    await userEvent.click(stelle[0]);
    expect(stelle[0]).toHaveAttribute('aria-pressed', 'true');
    await vi.waitFor(() => expect(documentiApi.salva).toHaveBeenCalledWith('guida-preferiti', { elenco: ['mind-1'] }, expect.anything()));
  });

  it('un modulo che non esiste riporta alla Guida', () => {
    apri('/guida/inesistente');
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });
});
