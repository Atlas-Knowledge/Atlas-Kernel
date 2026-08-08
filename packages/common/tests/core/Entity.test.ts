import { describe, expect, it } from 'vitest';

import {
  Entity,
  type EntityProps,
} from '../../src/core/Entity';

import {
  UniqueEntityId,
} from '../../src/core/UniqueEntityId';

interface TestEntityProps extends EntityProps {
  readonly name: string;
  readonly status: string;
}

class TestEntity extends Entity<TestEntityProps> {
  constructor(
    props: TestEntityProps,
  ) {
    super(props);
  }

  public get name(): string {
    return this.props.name;
  }

  public get status(): string {
    return this.props.status;
  }
}

describe('Entity', () => {
  it('stores the entity identifier', () => {
    const id =
      UniqueEntityId.fromString('entity-001');

    const entity = new TestEntity({
      id,
      name: 'Atlas',
      status: 'active',
    });

    expect(entity.id).toBe(id);
    expect(entity.id.value).toBe('entity-001');
  });

  it('stores entity properties', () => {
    const entity = new TestEntity({
      id: UniqueEntityId.fromString('entity-001'),
      name: 'Atlas',
      status: 'active',
    });

    expect(entity.value).toEqual({
      id: entity.id,
      name: 'Atlas',
      status: 'active',
    });
  });

  it('compares entities by identity', () => {
    const id =
      UniqueEntityId.fromString('entity-001');

    const first = new TestEntity({
      id,
      name: 'Atlas',
      status: 'active',
    });

    const second = new TestEntity({
      id,
      name: 'Different Name',
      status: 'inactive',
    });

    expect(first.equals(second)).toBe(true);
  });

  it('detects different entity identities', () => {
    const first = new TestEntity({
      id: UniqueEntityId.fromString('entity-001'),
      name: 'Atlas',
      status: 'active',
    });

    const second = new TestEntity({
      id: UniqueEntityId.fromString('entity-002'),
      name: 'Atlas',
      status: 'active',
    });

    expect(first.equals(second)).toBe(false);
  });

  it('serializes entity properties', () => {
    const entity = new TestEntity({
      id: UniqueEntityId.fromString('entity-001'),
      name: 'Atlas',
      status: 'active',
    });

    expect(entity.toJSON()).toEqual({
      id: entity.id,
      name: 'Atlas',
      status: 'active',
    });
  });

  it('exposes immutable top-level properties', () => {
    const entity = new TestEntity({
      id: UniqueEntityId.fromString('entity-001'),
      name: 'Atlas',
      status: 'active',
    });

    expect(
      Object.isFrozen(entity.value),
    ).toBe(true);
  });

  it('preserves identity when properties differ', () => {
    const id =
      UniqueEntityId.fromString('entity-001');

    const first = new TestEntity({
      id,
      name: 'Atlas',
      status: 'active',
    });

    const second = new TestEntity({
      id,
      name: 'Atlas Kernel',
      status: 'archived',
    });

    expect(first.id.equals(second.id)).toBe(true);
    expect(first.equals(second)).toBe(true);
  });
});
