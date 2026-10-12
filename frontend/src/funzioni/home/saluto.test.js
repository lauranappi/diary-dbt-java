import { describe, expect, it } from 'vitest';
import { dataEstesa, saluto } from './saluto.js';

describe('saluto', () => {
  it.each([
    [3, 'Buonanotte'],
    [9, 'Buongiorno'],
    [15, 'Buon pomeriggio'],
    [21, 'Buonasera'],
  ])('alle %i dice %s', (ora, atteso) => {
    expect(saluto(new Date(2026, 9, 12, ora))).toBe(atteso);
  });

  it('scrive la data per esteso', () => {
    expect(dataEstesa(new Date(2026, 9, 12))).toBe('Lunedì 12 ottobre');
  });
});
