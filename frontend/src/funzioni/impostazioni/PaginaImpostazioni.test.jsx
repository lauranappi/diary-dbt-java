import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { profiloApi } from '../../api/profilo.js';
import { leggiSessione, salvaSessione } from '../../api/sessione.js';
import { ProviderAutenticazione } from '../autenticazione/ProviderAutenticazione.jsx';
import PaginaImpostazioni from './PaginaImpostazioni.jsx';
import * as push from './push.js';

vi.mock('../../api/profilo.js', () => ({
  profiloApi: { leggi: vi.fn(), modifica: vi.fn(), collegaTerapeuta: vi.fn(), scollegaTerapeuta: vi.fn() },
}));
vi.mock('./push.js', () => ({
  pushSupportato: vi.fn(() => true),
  oraSalvata: vi.fn(() => '21:00'),
  iscrizioneAttuale: vi.fn(),
  attivaPromemoria: vi.fn(),
  cambiaOraPromemoria: vi.fn(),
  disattivaPromemoria: vi.fn(),
  notificaDiProva: vi.fn(),
}));

function apri() {
  salvaSessione({
    token: 't',
    utente: { id: 'u1', username: 'laura', nome: 'Laura', cognome: 'N', ruolo: 'PAZIENTE', codicePaziente: 'K7M2QX', codiceTerapeuta: null },
  });
  render(<ProviderAutenticazione><PaginaImpostazioni /></ProviderAutenticazione>);
  return userEvent.setup();
}

describe('PaginaImpostazioni', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.stubGlobal('Notification', { permission: 'granted' });
    push.iscrizioneAttuale.mockResolvedValue(null);
    profiloApi.leggi.mockResolvedValue({});
  });

  it('mostra profilo e codice della paziente', () => {
    apri();
    expect(screen.getByLabelText('Nome')).toHaveValue('Laura');
    expect(screen.getByLabelText('Il tuo codice')).toHaveValue('K7M2QX');
  });

  it('mostra il nome della terapeuta collegata, anche se la sessione non lo sapeva', async () => {
    profiloApi.leggi.mockResolvedValue({ codiceTerapeuta: 'e.roder', nomeTerapeuta: 'Emanuela Roder' });
    apri();
    expect(await screen.findByText('Emanuela Roder')).toBeInTheDocument();
    expect(screen.getByLabelText('Username della tua terapeuta')).toHaveValue('e.roder');
  });

  it('uscendo dal campo salva nome e cognome e aggiorna la sessione', async () => {
    profiloApi.modifica.mockResolvedValue({ nome: 'Laura', cognome: 'Nappi' });
    const u = apri();
    await u.clear(screen.getByLabelText('Cognome'));
    await u.type(screen.getByLabelText('Cognome'), 'Nappi');
    await u.tab();
    await waitFor(() => expect(profiloApi.modifica).toHaveBeenCalledWith('Laura', 'Nappi'));
    await waitFor(() => expect(leggiSessione().utente.cognome).toBe('Nappi'));
  });

  it('non salva se non è cambiato niente', async () => {
    const u = apri();
    await u.click(screen.getByLabelText('Nome'));
    await u.tab();
    expect(profiloApi.modifica).not.toHaveBeenCalled();
  });

  it('collega e scollega la terapeuta', async () => {
    profiloApi.collegaTerapeuta.mockResolvedValue(null);
    profiloApi.scollegaTerapeuta.mockResolvedValue(null);
    const u = apri();
    await u.type(screen.getByLabelText('Username della tua terapeuta'), 'dott.bianchi');
    await u.tab();
    await waitFor(() => expect(profiloApi.collegaTerapeuta).toHaveBeenCalledWith('dott.bianchi'));
    await waitFor(() => expect(leggiSessione().utente.codiceTerapeuta).toBe('dott.bianchi'));
    await u.clear(screen.getByLabelText('Username della tua terapeuta'));
    await u.tab();
    await waitFor(() => expect(profiloApi.scollegaTerapeuta).toHaveBeenCalled());
  });

  it('un codice terapeuta sbagliato mostra l\'errore e torna al valore di prima', async () => {
    profiloApi.collegaTerapeuta.mockRejectedValue(new Error('Terapeuta non trovata'));
    const u = apri();
    await u.type(screen.getByLabelText('Username della tua terapeuta'), 'nessuno');
    await u.tab();
    expect(await screen.findByRole('alert')).toHaveTextContent('Terapeuta non trovata');
    expect(screen.getByLabelText('Username della tua terapeuta')).toHaveValue('');
  });

  it('accende il promemoria con l\'orario scelto', async () => {
    push.attivaPromemoria.mockResolvedValue();
    const u = apri();
    await u.click(screen.getByRole('switch', { name: 'Promemoria giornaliero' }));
    await waitFor(() => expect(push.attivaPromemoria).toHaveBeenCalledWith('21:00'));
    expect(screen.getByRole('switch', { name: 'Promemoria giornaliero' })).toBeChecked();
  });

  it('se il permesso viene negato spiega il motivo e resta spento', async () => {
    push.attivaPromemoria.mockRejectedValue(new Error('Le notifiche sono bloccate'));
    const u = apri();
    await u.click(screen.getByRole('switch', { name: 'Promemoria giornaliero' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('bloccate');
    expect(screen.getByRole('switch', { name: 'Promemoria giornaliero' })).not.toBeChecked();
  });

  it('con il promemoria attivo, cambiando ora si aggiorna il server', async () => {
    push.iscrizioneAttuale.mockResolvedValue({ endpoint: 'x' });
    push.cambiaOraPromemoria.mockResolvedValue();
    apri();
    await waitFor(() => expect(screen.getByRole('switch', { name: 'Promemoria giornaliero' })).toBeChecked());
    const campo = screen.getByLabelText('Orario promemoria');
    await userEvent.clear(campo);
    await userEvent.type(campo, '20:30');
    await waitFor(() => expect(push.cambiaOraPromemoria).toHaveBeenLastCalledWith('20:30'));
  });

  it('senza supporto push avvisa e blocca l\'interruttore', () => {
    push.pushSupportato.mockReturnValue(false);
    apri();
    expect(screen.getByText(/non supporta le notifiche/)).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: 'Promemoria giornaliero' })).toBeDisabled();
  });
});
