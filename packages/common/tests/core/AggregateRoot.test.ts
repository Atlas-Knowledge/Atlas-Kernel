import { describe, expect, it } from 'vitest';

import { AggregateRoot } from '../../src/core/AggregateRoot';
import { DomainEvent } from '../../src/core/DomainEvent';
import {
  type EntityProps,
} from '../../src/core/Entity';
import {
  UniqueEntityId,
} from '../../src/core/UniqueEntityId';

interface TestAggregateProps extends EntityProps {
  readonly name: string;
}

class TestEvent extends DomainEvent {
  public readonly aggregateId: UniqueEntityId;

  constructor(aggregateId: UniqueEntityId) {
    super();

    this.aggregateId = aggregateId;
  }

  public get eventName(): string {
    return 'test.aggregate.changed';
  }
}

class TestAggregate extends AggregateRoot<TestAggregateProps> {
  constructor(props: TestAggregateProps) {
    super(props);
  }

  public recordTestEvent(): void {
    this.addDomainEvent(
      new TestEvent(this.id),
    );
  }
}

describe('AggregateRoot', () => {
  it('starts without domain events', () => {
    const aggregate = new TestAggregate({
      id: UniqueEntityId.fromString('aggregate-001'),
      name: 'Atlas',
    });

    expect(aggregate.domainEvents).toEqual([]);
    expect(aggregate.domainEventCount).toBe(0);
  });

  it('records a domain event', () => {
    const aggregate = new TestAggregate({
      id: UniqueEntityId.fromString('aggregate-001'),
      name: 'Atlas',
    });

    aggregate.recordTestEvent();

    expect(aggregate.domainEventCount).toBe(1);
    expect(aggregate.domainEvents).toHaveLength(1);
    expect(aggregate.domainEvents[0]).toBeInstanceOf(
      TestEvent,
    );
  });

  it('returns a copy of the domain events', () => {
    const aggregate = new TestAggregate({
      id: UniqueEntityId.fromString('aggregate-001'),
      name: 'Atlas',
    });

    aggregate.recordTestEvent();

    const events = aggregate.domainEvents;

    expect(events).toHaveLength(1);

    expect(() => {
      (
        events as DomainEvent[]
      ).pop();
    }).not.toThrow();

    expect(aggregate.domainEventCount).toBe(1);
  });

  it('pulls and clears domain events', () => {
    const aggregate = new TestAggregate({
      id: UniqueEntityId.fromString('aggregate-001'),
      name: 'Atlas',
    });

    aggregate.recordTestEvent();
    aggregate.recordTestEvent();

    expect(aggregate.domainEventCount).toBe(2);

    const events =
      aggregate.pullDomainEvents();

    expect(events).toHaveLength(2);
    expect(aggregate.domainEventCount).toBe(0);
    expect(aggregate.domainEvents).toEqual([]);
  });

  it('returns events in insertion order', () => {
    const aggregate = new TestAggregate({
      id: UniqueEntityId.fromString('aggregate-001'),
      name: 'Atlas',
    });

    aggregate.recordTestEvent();
    aggregate.recordTestEvent();

    const events =
      aggregate.pullDomainEvents();

    expect(events[0]).toBeInstanceOf(TestEvent);
    expect(events[1]).toBeInstanceOf(TestEvent);

    expect(
      events[0].eventName,
    ).toBe('test.aggregate.changed');

    expect(
      events[1].eventName,
    ).toBe('test.aggregate.changed');
  });

  it('clears domain events explicitly', () => {
    const aggregate = new TestAggregate({
      id: UniqueEntityId.fromString('aggregate-001'),
      name: 'Atlas',
    });

    aggregate.recordTestEvent();

    expect(aggregate.domainEventCount).toBe(1);

    aggregate.clearDomainEvents();

    expect(aggregate.domainEventCount).toBe(0);
    expect(aggregate.domainEvents).toEqual([]);
  });

  it('preserves aggregate identity', () => {
    const id =
      UniqueEntityId.fromString('aggregate-001');

    const aggregate = new TestAggregate({
      id,
      name: 'Atlas',
    });

    expect(aggregate.id).toBe(id);
    expect(aggregate.id.value).toBe(
      'aggregate-001',
    );
  });

  it('uses entity identity equality', () => {
    const id =
      UniqueEntityId.fromString('aggregate-001');

    const first = new TestAggregate({
      id,
      name: 'Atlas',
    });

    const second = new TestAggregate({
      id,
      name: 'Atlas Core',
    });

    expect(first.equals(second)).toBe(true);
  });
});
