import { describe, expect, it } from 'vitest';

import { Namespace } from '../../src/identifiers/Namespace';

describe('Namespace', () => {
  it('creates namespace', () => {
    const ns = Namespace.create('atlas');

    expect(ns.value).toBe('atlas');
  });

  it('normalizes to lowercase', () => {
    const ns = Namespace.create('ATLAS');

    expect(ns.value).toBe('atlas');
  });

  it('supports equality', () => {
    const a = Namespace.create('atlas');
    const b = Namespace.create('atlas');

    expect(a.equals(b)).toBe(true);
  });

  it('serializes correctly', () => {
    const ns = Namespace.create('atlas');

    expect(ns.toJSON()).toBe('atlas');
  });

  it('throws for invalid namespace', () => {
    expect(() =>
      Namespace.create('!!!'),
    ).toThrow();
  });
});
