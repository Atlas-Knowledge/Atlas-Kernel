import { describe, expect, it } from 'vitest';

import { Assertion } from '../../src/core/Assertion';
import { DomainError } from '../../src/core/DomainError';

describe('Assertion', () => {
  describe('that()', () => {
    it('accepts a true condition', () => {
      expect(() =>
        Assertion.that(true, 'Should pass.'),
      ).not.toThrow();
    });

    it('rejects a false condition', () => {
      expect(() =>
        Assertion.that(false, 'Condition failed.'),
      ).toThrow(DomainError);
    });

    it('preserves the supplied message', () => {
      expect(() =>
        Assertion.that(false, 'Invariant failed.'),
      ).toThrow('Invariant failed.');
    });
  });

  describe('defined()', () => {
    it('accepts defined values', () => {
      expect(() =>
        Assertion.defined('atlas'),
      ).not.toThrow();
    });

    it('accepts zero', () => {
      expect(() =>
        Assertion.defined(0),
      ).not.toThrow();
    });

    it('accepts false', () => {
      expect(() =>
        Assertion.defined(false),
      ).not.toThrow();
    });

    it('rejects null', () => {
      expect(() =>
        Assertion.defined(null),
      ).toThrow(DomainError);
    });

    it('rejects undefined', () => {
      expect(() =>
        Assertion.defined(undefined),
      ).toThrow(DomainError);
    });
  });

  describe('nonEmpty()', () => {
    it('accepts a non-empty string', () => {
      expect(() =>
        Assertion.nonEmpty('atlas'),
      ).not.toThrow();
    });

    it('rejects an empty string', () => {
      expect(() =>
        Assertion.nonEmpty(''),
      ).toThrow(DomainError);
    });

    it('rejects whitespace-only strings', () => {
      expect(() =>
        Assertion.nonEmpty('   '),
      ).toThrow(DomainError);
    });
  });

  describe('equal()', () => {
    it('accepts equal primitive values', () => {
      expect(() =>
        Assertion.equal(10, 10),
      ).not.toThrow();
    });

    it('rejects different primitive values', () => {
      expect(() =>
        Assertion.equal(10, 20),
      ).toThrow(DomainError);
    });

    it('uses Object.is semantics', () => {
      expect(() =>
        Assertion.equal(NaN, NaN),
      ).not.toThrow();
    });

    it('rejects different object references', () => {
      expect(() =>
        Assertion.equal(
          { value: 1 },
          { value: 1 },
        ),
      ).toThrow(DomainError);
    });
  });

  describe('not()', () => {
    it('accepts false conditions', () => {
      expect(() =>
        Assertion.not(false, 'Should pass.'),
      ).not.toThrow();
    });

    it('rejects true conditions', () => {
      expect(() =>
        Assertion.not(true, 'Condition must be false.'),
      ).toThrow(DomainError);
    });
  });
});
