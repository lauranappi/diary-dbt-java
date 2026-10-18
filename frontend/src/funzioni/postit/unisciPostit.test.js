import { describe, expect, it } from 'vitest';
import { unisciPostit } from './unisciPostit.js';

const p = (id, ts, extra = {}) => ({ id, t: id, c: 0, ts, ...extra });

describe('unisciPostit', () => {
  it('tiene i post-it di entrambi i dispositivi e, per lo stesso, il più recente', () => {
    const r = unisciPostit({ 'mod:reg': [p('a', 5, { t: 'nuovo' })] }, { 'mod:reg': [p('a', 3, { t: 'vecchio' }), p('b', 4)], 'fg:t-stop': [p('c', 1)] });
    expect(r['mod:reg'].map((x) => [x.id, x.t])).toEqual([['a', 'nuovo'], ['b', 'b']]);
    expect(r['fg:t-stop']).toHaveLength(1);
  });

  it('una lapide recente vince sul testo vecchio, una lapide vecchia di 90 giorni sparisce', () => {
    const adesso = 1_000_000_000_000;
    const r = unisciPostit({ k: [p('a', adesso - 1000, { d: 1, t: '' }), p('x', adesso - 91 * 86400000, { d: 1, t: '' })] }, { k: [p('a', adesso - 5000)] }, adesso);
    expect(r.k).toHaveLength(1);
    expect(r.k[0].d).toBe(1);
  });
});
