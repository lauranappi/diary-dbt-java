import { describe, expect, it } from 'vitest';
import { creaCoda } from './coda.js';

describe('creaCoda', () => {
  it('esegue i lavori uno alla volta, nell\'ordine', async () => {
    const coda = creaCoda();
    const ordine = [];
    const lento = coda(async () => { await new Promise((r) => setTimeout(r, 20)); ordine.push('primo'); });
    const veloce = coda(async () => { ordine.push('secondo'); });
    await Promise.all([lento, veloce]);
    expect(ordine).toEqual(['primo', 'secondo']);
  });

  it('un errore non blocca i lavori successivi', async () => {
    const coda = creaCoda();
    await expect(coda(() => Promise.reject(new Error('no')))).rejects.toThrow('no');
    await expect(coda(async () => 'ok')).resolves.toBe('ok');
  });
});
