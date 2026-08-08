import { describe, expect, it } from 'vitest';

import {
  createDomainError,
  DomainError,
} from '../../src/core/DomainError';

describe('DomainError', () => {
  it('creates a domain error', () => {
    const error = new DomainError({
      code: 'TEST_ERROR',
      message: 'Test error.',
    });

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(DomainError);
    expect(error.name).toBe('DomainError');
    expect(error.code).toBe('TEST_ERROR');
    expect(error.message).toBe('Test error.');
  });

  it('preserves the cause', () => {
    const cause = new Error('Original error.');

    const error = new DomainError({
      code: 'TEST_ERROR',
      message: 'Wrapped error.',
      cause,
    });

    expect(error.cause).toBe(cause);
  });

  it('supports createDomainError()', () => {
    const error = createDomainError({
      code: 'FACTORY_ERROR',
      message: 'Created through factory.',
    });

    expect(error).toBeInstanceOf(DomainError);
    expect(error.code).toBe('FACTORY_ERROR');
    expect(error.message).toBe(
      'Created through factory.',
    );
  });

  it('serializes safely', () => {
    const error = new DomainError({
      code: 'TEST_ERROR',
      message: 'Test error.',
    });

    expect(error.toJSON()).toEqual({
      name: 'DomainError',
      code: 'TEST_ERROR',
      message: 'Test error.',
    });
  });

  it('does not expose the cause through toJSON()', () => {
    const cause = new Error('Sensitive internal cause.');

    const error = new DomainError({
      code: 'TEST_ERROR',
      message: 'Test error.',
      cause,
    });

    expect(error.toJSON()).not.toHaveProperty(
      'cause',
    );
  });

  it('supports custom error subclasses', () => {
    class TestDomainError extends DomainError {
      constructor() {
        super({
          code: 'TEST_SUBCLASS',
          message: 'Subclass error.',
        });

        this.name = 'TestDomainError';
      }
    }

    const error = new TestDomainError();

    expect(error).toBeInstanceOf(DomainError);
    expect(error).toBeInstanceOf(TestDomainError);
    expect(error.name).toBe('TestDomainError');
  });
});
