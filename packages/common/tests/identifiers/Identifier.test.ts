import { describe, expect, it } from 'vitest';

import { IdentifierFactory } from '../../src/identifiers/IdentifierFactory';

describe('Identifier', () => {
  it('creates a canonical identifier', () => {
    const identifier = IdentifierFactory.entity('earth');

    expect(identifier.value).toBe('atlas:entity:earth');
  });

  it('returns namespace', () => {
    const identifier = IdentifierFactory.entity('earth');

    expect(identifier.namespace.value).toBe('atlas');
  });

  it('returns type', () => {
    const identifier = IdentifierFactory.entity('earth');

    expect(identifier.type).toBe('entity');
  });

  it('returns local identifier', () => {
    const identifier = IdentifierFactory.entity('earth');

    expect(identifier.localId).toBe('earth');
  });

  it('serializes to string', () => {
    const identifier = IdentifierFactory.entity('earth');

    expect(identifier.toString()).toBe(
      'atlas:entity:earth',
    );
  });

  it('serializes to JSON', () => {
    const identifier = IdentifierFactory.entity('earth');

    expect(identifier.toJSON()).toBe(
      'atlas:entity:earth',
    );
  });

  it('supports equality', () => {
    const a = IdentifierFactory.entity('earth');
    const b = IdentifierFactory.entity('earth');

    expect(a.equals(b)).toBe(true);
  });

  it('detects inequality', () => {
    const a = IdentifierFactory.entity('earth');
    const b = IdentifierFactory.entity('mars');

    expect(a.equals(b)).toBe(false);
  });
});
