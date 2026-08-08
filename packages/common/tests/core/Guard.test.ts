import { describe, expect, it } from 'vitest';

import { DomainError } from '../../src/core/DomainError';
import { Guard } from '../../src/core/Guard';

describe('Guard', () => {
  describe('notNull()', () => {
    it('accepts a defined value', () => {
      expect(() => Guard.notNull('atlas')).not.toThrow();
    });

    it('rejects null', () => {
      expect(() => Guard.notNull(null)).toThrow(
        DomainError,
      );
    });

    it('rejects undefined', () => {
      expect(() =>
        Guard.notNull(undefined),
      ).toThrow(DomainError);
    });

    it('uses the supplied error message', () => {
      expect(() =>
        Guard.notNull(null, 'Value is required.'),
      ).toThrow('Value is required.');
    });
  });

  describe('notEmpty()', () => {
    it('accepts a non-empty string', () => {
      expect(() =>
        Guard.notEmpty('atlas'),
      ).not.toThrow();
    });

    it('rejects an empty string', () => {
      expect(() =>
        Guard.notEmpty(''),
      ).toThrow(DomainError);
    });

    it('rejects whitespace-only strings', () => {
      expect(() =>
        Guard.notEmpty('   '),
      ).toThrow(DomainError);
    });
  });

  describe('maxLength()', () => {
    it('accepts values within the maximum length', () => {
      expect(() =>
        Guard.maxLength('atlas', 5),
      ).not.toThrow();
    });

    it('accepts values equal to the maximum length', () => {
      expect(() =>
        Guard.maxLength('atlas', 5),
      ).not.toThrow();
    });

    it('rejects values exceeding the maximum length', () => {
      expect(() =>
        Guard.maxLength('atlas-core', 5),
      ).toThrow(DomainError);
    });
  });

  describe('minLength()', () => {
    it('accepts values meeting the minimum length', () => {
      expect(() =>
        Guard.minLength('atlas', 5),
      ).not.toThrow();
    });

    it('rejects values below the minimum length', () => {
      expect(() =>
        Guard.minLength('at', 5),
      ).toThrow(DomainError);
    });
  });

  describe('isTrue()', () => {
    it('accepts true', () => {
      expect(() =>
        Guard.isTrue(true),
      ).not.toThrow();
    });

    it('rejects false', () => {
      expect(() =>
        Guard.isTrue(false),
      ).toThrow(DomainError);
    });
  });

  describe('isFalse()', () => {
    it('accepts false', () => {
      expect(() =>
        Guard.isFalse(false),
      ).not.toThrow();
    });

    it('rejects true', () => {
      expect(() =>
        Guard.isFalse(true),
      ).toThrow(DomainError);
    });
  });

  describe('string()', () => {
    it('accepts strings', () => {
      expect(() =>
        Guard.string('atlas'),
      ).not.toThrow();
    });

    it('rejects numbers', () => {
      expect(() =>
        Guard.string(123),
      ).toThrow(DomainError);
    });

    it('rejects objects', () => {
      expect(() =>
        Guard.string({}),
      ).toThrow(DomainError);
    });
  });

  describe('nonEmptyArray()', () => {
    it('accepts a non-empty array', () => {
      expect(() =>
        Guard.nonEmptyArray([1]),
      ).not.toThrow();
    });

    it('rejects an empty array', () => {
      expect(() =>
        Guard.nonEmptyArray([]),
      ).toThrow(DomainError);
    });
  });
});
