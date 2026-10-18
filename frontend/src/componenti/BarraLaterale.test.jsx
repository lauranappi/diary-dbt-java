import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import BarraLaterale from './BarraLaterale.jsx';

const voci = [{ percorso: '/', etichetta: 'Home' }, { percorso: '/diario', etichetta: 'Diary' }];

describe('BarraLaterale', () => {
  it('mostra le voci, il nome con le iniziali e il ruolo', () => {
    render(<MemoryRouter><BarraLaterale voci={voci} utente={{ nome: 'Laura', cognome: 'Nappi', username: 'laura', ruolo: 'PAZIENTE' }} onEsci={() => {}} /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Diary' })).toHaveAttribute('href', '/diario');
    expect(screen.getByRole('link', { name: 'Impostazioni' })).toBeInTheDocument();
    expect(screen.getByText('Laura Nappi')).toBeInTheDocument();
    expect(screen.getByText('LN')).toBeInTheDocument();
    expect(screen.getByText('Paziente')).toBeInTheDocument();
  });

  it('senza nome usa lo username e il pulsante esci funziona', async () => {
    const onEsci = vi.fn();
    render(<MemoryRouter><BarraLaterale voci={voci} utente={{ username: 'dott.bianchi', ruolo: 'TERAPEUTA' }} onEsci={onEsci} /></MemoryRouter>);
    expect(screen.getByText('dott.bianchi')).toBeInTheDocument();
    expect(screen.getByText('Terapeuta')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Esci' }));
    expect(onEsci).toHaveBeenCalled();
  });
});
