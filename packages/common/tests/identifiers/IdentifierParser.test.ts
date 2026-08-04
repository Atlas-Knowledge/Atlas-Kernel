import { describe, expect, it } from 'vitest';

import { IdentifierParser } from '../../src/identifiers/IdentifierParser';

describe('IdentifierParser', () => {
  it('parses canonical identifier', () => {
    const parsed =
      IdentifierParser.parse(
        'atlas:entity:earth',
      );

    expect(parsed.namespace).toBe('atlas');
    expect(parsed.type).toBe('entity');
    expect(parsed.localId).toBe('earth');
  });

  it('throws for invalid identifier', () => {
    expect(() =>
      IdentifierParser.parse('atlas'),
    ).toThrow();
  });

  it('returns null from tryParse()', () => {
    expect(
      IdentifierParser.tryParse('invalid'),
    ).toBeNull();
  });

  it('canParse()', () => {
    expect(
      IdentifierParser.canParse(
        'atlas:entity:earth',
      ),
    ).toBe(true);

    expect(
      IdentifierParser.canParse('bad'),
    ).toBe(false);
  });
});
