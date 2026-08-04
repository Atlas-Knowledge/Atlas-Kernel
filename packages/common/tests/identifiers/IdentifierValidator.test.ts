import { describe, expect, it } from 'vitest';

import { IdentifierValidator } from '../../src/identifiers/IdentifierValidator';

describe('IdentifierValidator', () => {
  it('accepts valid namespace', () => {
    expect(
      IdentifierValidator.isValidNamespace('atlas'),
    ).toBe(true);
  });

  it('rejects invalid namespace', () => {
    expect(
      IdentifierValidator.isValidNamespace('!!!'),
    ).toBe(false);
  });

  it('accepts canonical identifier', () => {
    expect(
      IdentifierValidator.isValid(
        'atlas:entity:earth',
      ),
    ).toBe(true);
  });

  it('rejects malformed identifier', () => {
    expect(
      IdentifierValidator.isValid(
        'atlas',
      ),
    ).toBe(false);
  });

  it('throws on invalid identifier', () => {
    expect(() =>
      IdentifierValidator.validateCanonical(
        'atlas',
      ),
    ).toThrow();
  });
});
