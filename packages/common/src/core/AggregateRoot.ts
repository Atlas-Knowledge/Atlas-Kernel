/**
 * Atlas Kernel
 *
 * Core Aggregate Root
 *
 * Base class for Domain-Driven Design Aggregate Roots.
 *
 * An Aggregate Root is an Entity responsible for maintaining
 * the consistency boundary of an Aggregate and collecting
 * Domain Events produced by that Aggregate.
 */

import type { DomainEvent } from './DomainEvent';
import type { EntityProps } from './Entity';
import { Entity } from './Entity';

/**
 * Base Aggregate Root.
 *
 * TProps must contain the Entity identity.
 */
export abstract class AggregateRoot<
  TProps extends EntityProps,
> extends Entity<TProps> {
  readonly #domainEvents: DomainEvent[] = [];

  /**
   * Returns the events currently recorded by the Aggregate.
   */
  public get domainEvents(): readonly DomainEvent[] {
    return [...this.#domainEvents];
  }

  /**
   * Records a Domain Event.
   */
  protected addDomainEvent(
    event: DomainEvent,
  ): void {
    this.#domainEvents.push(event);
  }

  /**
   * Removes all currently recorded Domain Events
   * and returns them.
   *
   * This is intended for the application/infrastructure
   * layer after the Aggregate has been persisted.
   */
  public pullDomainEvents(): readonly DomainEvent[] {
    const events = [...this.#domainEvents];

    this.#domainEvents.length = 0;

    return events;
  }

  /**
   * Clears all recorded Domain Events.
   */
  public clearDomainEvents(): void {
    this.#domainEvents.length = 0;
  }

  /**
   * Returns the number of pending Domain Events.
   */
  public get domainEventCount(): number {
    return this.#domainEvents.length;
  }
}
