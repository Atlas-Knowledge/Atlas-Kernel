import { describe, expect, it } from 'vitest';

import { IdentifierFactory } from '../../src/identifiers/IdentifierFactory';

describe('IdentifierFactory', () => {
  it('creates entity identifier', () => {
    expect(
      IdentifierFactory.entity('earth').value,
    ).toBe('atlas:entity:earth');
  });

  it('creates knowledge identifier', () => {
    expect(
      IdentifierFactory.knowledge('solar'),
    ).toHaveProperty(
      'value',
      'atlas:knowledge:solar',
    );
  });

  it('creates evidence identifier', () => {
    expect(
      IdentifierFactory.evidence('ev-001').value,
    ).toBe('atlas:evidence:ev-001');
  });

  it('creates claim identifier', () => {
    expect(
      IdentifierFactory.claim('claim-001').value,
    ).toBe('atlas:claim:claim-001');
  });

  it('creates custom identifier', () => {
    expect(
      IdentifierFactory.custom(
        'tec',
        'entity',
        'merchant',
      ).value,
    ).toBe('tec:entity:merchant');
  });

  it('creates identifier from string', () => {
    expect(
      IdentifierFactory.fromString(
        'atlas:entity:earth',
      ).value,
    ).toBe('atlas:entity:earth');
  });
});
