import { describe, expect, it } from 'vitest';

import {
  UniqueEntityId,
} from '../../src/core/UniqueEntityId';
import { DomainError } from '../../src/core/DomainError';

describe('UniqueEntityId', () => {
  it('creates a unique identifier', () => {
    const id = UniqueEntityId.create();

    expect(id.value).toBeTypeOf('string');
    expect(id.value.length).toBeGreaterThan(0);
  });

  it('creates different identifiers on separate calls', () => {
    const first = UniqueEntityId.create();
    const second = UniqueEntityId.create();

    expect(first.equals(second)).toBe(false);
    expect(first.value).not.toBe(second.value);
  });

  it('creates an identifier from an existing string', () => {
    const id = UniqueEntityId.fromString(
      'entity-001',
    );

    expect(id.value).toBe('entity-001');
  });

  it('trims an existing identifier', () => {
    const id = UniqueEntityId.fromString(
      '  entity-001  ',
    );

    expect(id.value).toBe('entity-001');
  });

  it('rejects an empty identifier', () => {
    expect(() =>
      UniqueEntityId.fromString(''),
    ).toThrow(DomainError);
  });

  it('rejects whitespace-only identifiers', () => {
    expect(() =>
      UniqueEntityId.fromString('   '),
    ).toThrow(DomainError);
  });

  it('rejects identifiers longer than 255 characters', () => {
    const value = 'a'.repeat(256);

    expect(() =>
      UniqueEntityId.fromString(value),
    ).toThrow(DomainError);
  });

  it('accepts an identifier with exactly 255 characters', () => {
    const value = 'a'.repeat(255);

    const id = UniqueEntityId.fromString(value);

    expect(id.value).toBe(value);
  });

  it('supports equality', () => {
    const first =
      UniqueEntityId.fromString('entity-001');

    const second =
      UniqueEntityId.fromString('entity-001');

    expect(first.equals(second)).toBe(true);
  });

  it('detects inequality', () => {
    const first =
      UniqueEntityId.fromString('entity-001');

    const second =
      UniqueEntityId.fromString('entity-002');

    expect(first.equals(second)).toBe(false);
  });

  it('supports toString()', () => {
    const id =
      UniqueEntityId.fromString('entity-001');

    expect(id.toString()).toBe('entity-001');
  });

  it('supports toJSON()', () => {
    const id =
      UniqueEntityId.fromString('entity-001');

    expect(id.toJSON()).toBe('entity-001');
  });

  it('does not expose mutable internal state', () => {
    const id =
      UniqueEntityId.fromString('entity-001');

    expect(id.value).toBe('entity-001');
  });
});
