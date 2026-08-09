import { describe, expect, it } from 'vitest';

import { ValueObject } from '../../src/core/ValueObject';

interface TestValue {
  readonly name: string;
  readonly version: number;
}

class TestValueObject extends ValueObject<TestValue> {}

describe('ValueObject', () => {
  it('stores its properties', () => {
    const valueObject = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    expect(valueObject.value).toEqual({
      name: 'Atlas',
      version: 1,
    });
  });

  it('creates immutable properties', () => {
    const valueObject = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    expect(Object.isFrozen(valueObject.value)).toBe(
      true,
    );
  });

  it('considers structurally equal objects equal', () => {
    const first = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    const second = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    expect(first.equals(second)).toBe(true);
  });

  it('detects different properties', () => {
    const first = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    const second = new TestValueObject({
      name: 'Atlas',
      version: 2,
    });

    expect(first.equals(second)).toBe(false);
  });

  it('detects different property names', () => {
    const first = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    const second = new TestValueObject({
      name: 'Atlas-Core',
      version: 1,
    });

    expect(first.equals(second)).toBe(false);
  });

  it('supports nested objects', () => {
    interface NestedValue {
      readonly metadata: {
        readonly name: string;
        readonly version: number;
      };
    }

    class NestedValueObject extends ValueObject<NestedValue> {}

    const first = new NestedValueObject({
      metadata: {
        name: 'Atlas',
        version: 1,
      },
    });

    const second = new NestedValueObject({
      metadata: {
        name: 'Atlas',
        version: 1,
      },
    });

    expect(first.equals(second)).toBe(true);
  });

  it('detects differences in nested objects', () => {
    interface NestedValue {
      readonly metadata: {
        readonly name: string;
        readonly version: number;
      };
    }

    class NestedValueObject extends ValueObject<NestedValue> {}

    const first = new NestedValueObject({
      metadata: {
        name: 'Atlas',
        version: 1,
      },
    });

    const second = new NestedValueObject({
      metadata: {
        name: 'Atlas',
        version: 2,
      },
    });

    expect(first.equals(second)).toBe(false);
  });

  it('supports arrays', () => {
    interface ListValue {
      readonly items: readonly string[];
    }

    class ListValueObject extends ValueObject<ListValue> {}

    const first = new ListValueObject({
      items: ['atlas', 'kernel'],
    });

    const second = new ListValueObject({
      items: ['atlas', 'kernel'],
    });

    expect(first.equals(second)).toBe(true);
  });

  it('detects different array contents', () => {
    interface ListValue {
      readonly items: readonly string[];
    }

    class ListValueObject extends ValueObject<ListValue> {}

    const first = new ListValueObject({
      items: ['atlas', 'kernel'],
    });

    const second = new ListValueObject({
      items: ['atlas', 'core'],
    });

    expect(first.equals(second)).toBe(false);
  });

  it('serializes through toJSON()', () => {
    const valueObject = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    expect(valueObject.toJSON()).toEqual({
      name: 'Atlas',
      version: 1,
    });
  });

  it('provides a string representation', () => {
    const valueObject = new TestValueObject({
      name: 'Atlas',
      version: 1,
    });

    expect(valueObject.toString()).toBe(
      '{"name":"Atlas","version":1}',
    );
  });
});
