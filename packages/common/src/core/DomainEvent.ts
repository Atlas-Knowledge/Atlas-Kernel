/**
 * Atlas Kernel
 *
 * Core Domain Event
 *
 * Base contract for events emitted by the domain.
 */

import { UniqueEntityId } from './UniqueEntityId';

/**
 * Base properties shared by all Domain Events.
 */
export interface DomainEventProps {
  readonly eventId: UniqueEntityId;
  readonly occurredAt: Date;
}

/**
 * Base Domain Event.
 *
 * Domain Events represent something meaningful that
 * has already happened inside the domain.
 */
export abstract class DomainEvent {
  readonly #eventId: UniqueEntityId;
  readonly #occurredAt: Date;

  protected constructor(props?: Partial<DomainEventProps>) {
    this.#eventId =
      props?.eventId ?? UniqueEntityId.create();

    this.#occurredAt = new Date(
      props?.occurredAt?.getTime() ?? Date.now(),
    );
  }

  /**
   * Unique event identifier.
   */
  public get eventId(): UniqueEntityId {
    return this.#eventId;
  }

  /**
   * Event occurrence timestamp.
   */
  public get occurredAt(): Date {
    return new Date(this.#occurredAt.getTime());
  }

  /**
   * Canonical event name.
   */
  public abstract get eventName(): string;

  /**
   * JSON serialization.
   */
  public toJSON(): {
    readonly eventId: string;
    readonly eventName: string;
    readonly occurredAt: string;
  } {
    return {
      eventId: this.#eventId.toString(),
      eventName: this.eventName,
      occurredAt: this.#occurredAt.toISOString(),
    };
  }
}
