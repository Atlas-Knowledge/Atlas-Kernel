import { describe, expect, it } from 'vitest';

import {
  isNone,
  isSome,
  none,
  some,
} from '../../src/core/Option';

describe('Option', () => {
  it('creates Some with a value', () => {
    const option = some('atlas');

    expect(option.kind).toBe('some');
    expect(option.value).toBe('atlas');
    expect(isSome(option)).toBe(true);
    expect(isNone(option)).toBe(false);
  });

  it('creates None without a value', () => {
    const option = none();

    expect(option.kind).toBe('none');
    expect(isNone(option)).toBe(true);
    expect(isSome(option)).toBe(false);
  });

  it('supports numeric values', () => {
    const option = some(100);

    expect(option.value).toBe(100);
  });

  it('supports object values', () => {
    const value = {
      id: 'entity-001',
    };

    const option = some(value);

    expect(option.value).toEqual(value);
  });

  it('creates immutable Some values', () => {
    const option = some({
      value: 'atlas',
    });

    expect(Object.isFrozen(option)).toBe(true);
  });

  it('creates immutable None values', () => {
    const option = none();

    expect(Object.isFrozen(option)).toBe(true);
  });
});
