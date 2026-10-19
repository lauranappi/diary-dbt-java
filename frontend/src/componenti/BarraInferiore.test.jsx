import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { aggiornaApp } from '../app/aggiornaApp.js';
import BarraInferiore from './BarraInferiore.jsx';

vi.mock('../app/aggiornaApp.js', () => ({ aggiornaApp: vi.fn() }));

const voci = [{ percorso: '/', etichetta: 'Home' }, { percorso: '/diario', etichetta: 'Diary' }];

describe('BarraInferiore', () => {
  beforeEach(() => { vi.useFakeTimers({ shouldAdvanceTime: true }); vi.clearAllMocks(); });
  afterEach(() => vi.useRealTimers());

  it('un tocco solo su Home non aggiorna', async () => {
    render(<MemoryRouter><BarraInferiore voci={voci} /></MemoryRouter>);
    await userEvent.setup({ advanceTimers: vi.advanceTimersByTime }).click(screen.getByRole('link', { name: 'Home' }));
    act(() => { vi.advanceTimersByTime(1000); });
    expect(aggiornaApp).not.toHaveBeenCalled();
  });

  it('due tocchi su Home aggiornano l\'app', async () => {
    render(<MemoryRouter><BarraInferiore voci={voci} /></MemoryRouter>);
    const u = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    await u.click(screen.getByRole('link', { name: 'Home' }));
    await u.click(screen.getByRole('link', { name: 'Home' }));
    expect(screen.getByLabelText('Aggiorno')).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(600); });
    expect(aggiornaApp).toHaveBeenCalledTimes(1);
  });

  it('due tocchi su un\'altra voce non aggiornano', async () => {
    render(<MemoryRouter><BarraInferiore voci={voci} /></MemoryRouter>);
    const u = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    await u.click(screen.getByRole('link', { name: 'Diary' }));
    await u.click(screen.getByRole('link', { name: 'Diary' }));
    act(() => { vi.advanceTimersByTime(1000); });
    expect(aggiornaApp).not.toHaveBeenCalled();
  });
});
