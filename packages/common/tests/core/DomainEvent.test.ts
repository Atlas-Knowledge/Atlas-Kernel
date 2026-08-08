import { describe, expect, it } from 'vitest';

import { DomainEvent } from '../../src/core/DomainEvent';
import { UniqueEntityId } from '../../src/core/UniqueEntityId';

class TestDomainEvent extends DomainEvent {
  public readonly entityId: UniqueEntityId;
  public readonly name: string;

  constructor(
    entityId: UniqueEntityId,
    name: string,
  ) {
    super();

    this.entityId = entityId;
    this.name = name;
  }

  public get eventName(): string {
    return 'test.entity.created';
  }
}

describe('DomainEvent', () => {
  it('creates a domain event', () => {
    const entityId =
      UniqueEntityId.fromString('entity-001');

    const event = new TestDomainEvent(
      entityId,
      'Atlas',
    );

    expect(event).toBeInstanceOf(DomainEvent);
    expect(event.eventId).toBeInstanceOf(
      UniqueEntityId,
    );
  });

  it('generates a unique event identifier', () => {
    const entityId =
      UniqueEntityId.fromString('entity-001');

    const first = new TestDomainEvent(
      entityId,
      'Atlas',
    );

    const second = new TestDomainEvent(
      entityId,
      'Atlas',
    );

    expect(
      first.eventId.equals(second.eventId),
    ).toBe(false);
  });

  it('exposes the event name', () => {
    const event = new TestDomainEvent(
      UniqueEntityId.fromString('entity-001'),
      'Atlas',
    );

    expect(event.eventName).toBe(
      'test.entity.created',
    );
  });

  it('creates an occurrence timestamp', () => {
    const event = new TestDomainEvent(
      UniqueEntityId.fromString('entity-001'),
      'Atlas',
    );

    expect(event.occurredAt).toBeInstanceOf(Date);
    expect(
      Number.isNaN(event.occurredAt.getTime()),
    ).toBe(false);
  });

  it('returns a defensive copy of occurredAt', () => {
    const event = new TestDomainEvent(
      UniqueEntityId.fromString('entity-001'),
      'Atlas',
    );

    const first = event.occurredAt;

    first.setFullYear(2000);

    const second = event.occurredAt;

    expect(second.getFullYear()).not.toBe(2000);
  });

  it('serializes the base event information', () => {
    const event = new TestDomainEvent(
      UniqueEntityId.fromString('entity-001'),
      'Atlas',
    );

    expect(event.toJSON()).toEqual({
      eventId: event.eventId.toString(),
      eventName: 'test.entity.created',
      occurredAt: event.occurredAt.toISOString(),
    });
  });

  it('preserves custom event data', () => {
    const event = new TestDomainEvent(
      UniqueEntityId.fromString('entity-001'),
      'Atlas',
    );

    expect(event.entityId.value).toBe(
      'entity-001',
    );

    expect(event.name).toBe('Atlas');
  });
});
