import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { diarioApi } from '../../api/diario.js';
import { TOTALE_ABILITA } from '../../contenuti/abilita.js';
import { chiave } from '../diario/date.js';
import PaginaAbilita from './PaginaAbilita.jsx';

vi.mock('../../api/diario.js', () => ({ diarioApi: { salva: vi.fn(), intervallo: vi.fn() } }));

describe('PaginaAbilita', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    diarioApi.intervallo.mockResolvedValue([{ abilitaUsate: { 'sk_Mindfulness_Osservare': true } }]);
    diarioApi.salva.mockResolvedValue({});
  });

  it('mostra le spunte di oggi e il conteggio', async () => {
    render(<PaginaAbilita />);
    expect(await screen.findByText(`1 su ${TOTALE_ABILITA} spuntate oggi`)).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Osservare' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Descrivere' })).not.toBeChecked();
  });

  it('spuntando salva l\'elenco completo', async () => {
    render(<PaginaAbilita />);
    await screen.findByText(/1 su/);
    await userEvent.click(screen.getByRole('checkbox', { name: 'PLEASE' }));
    await waitFor(() => expect(diarioApi.salva).toHaveBeenCalledWith({
      data: chiave(new Date()),
      abilitaUsate: { 'sk_Mindfulness_Osservare': true, 'sk_Regolazione emotiva_PLEASE': true },
    }));
    expect(screen.getByText(`2 su ${TOTALE_ABILITA} spuntate oggi`)).toBeInTheDocument();
  });

  it('se il salvataggio fallisce toglie la spunta e avvisa', async () => {
    diarioApi.salva.mockRejectedValue(new Error('offline'));
    render(<PaginaAbilita />);
    await screen.findByText(/1 su/);
    await userEvent.click(screen.getByRole('checkbox', { name: 'PLEASE' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'PLEASE' })).not.toBeChecked();
  });
});
