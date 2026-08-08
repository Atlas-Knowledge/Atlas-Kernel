import { describe, expect, it } from 'vitest';

import {
  err,
  isErr,
  isOk,
  ok,
} from '../../src/core/Result';

describe('Result', () => {
  it('creates a successful result', () => {
    const result = ok(42);

    expect(result.success).toBe(true);
    expect(result.value).toBe(42);
    expect(isOk(result)).toBe(true);
    expect(isErr(result)).toBe(false);
  });

  it('creates a failed result', () => {
    const result = err('Something went wrong.');

    expect(result.success).toBe(false);
    expect(result.error).toBe(
      'Something went wrong.',
    );
    expect(isErr(result)).toBe(true);
    expect(isOk(result)).toBe(false);
  });

  it('creates immutable success results', () => {
    const result = ok({
      value: 10,
    });

    expect(Object.isFrozen(result)).toBe(true);
  });

  it('creates immutable failure results', () => {
    const result = err({
      code: 'TEST_ERROR',
    });

    expect(Object.isFrozen(result)).toBe(true);
  });

  it('preserves complex value types', () => {
    const value = {
      id: '001',
      name: 'Atlas',
    };

    const result = ok(value);

    expect(result.value).toEqual(value);
  });

  it('preserves typed errors', () => {
    const error = {
      code: 'INVALID_IDENTIFIER',
      field: 'identifier',
    };

    const result = err(error);

    expect(result.error).toEqual(error);
  });
});
