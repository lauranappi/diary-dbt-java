import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import BarraLaterale from './BarraLaterale.jsx';

const voci = [{ percorso: '/', etichetta: 'Home' }, { percorso: '/diario', etichetta: 'Diary' }];

describe('BarraLaterale', () => {
  it('mostra le voci, il nome con le iniziali e il ruolo', () => {
    render(<MemoryRouter><BarraLaterale voci={voci} utente={{ nome: 'Laura', cognome: 'Nappi', username: 'laura', ruolo: 'PAZIENTE' }} /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Diary' })).toHaveAttribute('href', '/diario');
    expect(screen.getByText('Laura Nappi')).toBeInTheDocument();
    expect(screen.getByText('LN')).toBeInTheDocument();
    expect(screen.getByText('Paziente')).toBeInTheDocument();
  });

  it('senza nome usa lo username e il nome in fondo apre le impostazioni', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<BarraLaterale voci={voci} utente={{ username: 'dott.bianchi', ruolo: 'TERAPEUTA' }} />} />
          <Route path="/impostazioni" element={<p>pagina impostazioni</p>} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('dott.bianchi')).toBeInTheDocument();
    expect(screen.getByText('Terapeuta')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Impostazioni' }));
    expect(screen.getByText('pagina impostazioni')).toBeInTheDocument();
  });
});
