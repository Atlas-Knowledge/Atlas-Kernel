/**
 * Atlas Kernel
 *
 * Core Timestamp Value Object
 *
 * Represents a validated, immutable point in time.
 */

import { DomainError } from './DomainError';

export class Timestamp {
  readonly #value: Date;

  private constructor(value: Date) {
    this.#value = new Date(value.getTime());
  }

  /**
   * Creates a Timestamp representing the current time.
   */
  public static now(): Timestamp {
    return new Timestamp(new Date());
  }

  /**
   * Creates a Timestamp from a Date.
   */
  public static fromDate(value: Date): Timestamp {
    if (Number.isNaN(value.getTime())) {
      throw new DomainError({
        code: 'CORE_TIMESTAMP_INVALID',
        message: 'Timestamp must contain a valid date.',
      });
    }

    return new Timestamp(value);
  }

  /**
   * Creates a Timestamp from an ISO-8601 string.
   */
  public static fromISOString(
    value: string,
  ): Timestamp {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      throw new DomainError({
        code: 'CORE_TIMESTAMP_INVALID',
        message: `Invalid timestamp: "${value}".`,
      });
    }

    return new Timestamp(date);
  }

  /**
   * Returns a defensive copy of the underlying Date.
   */
  public get value(): Date {
    return new Date(this.#value.getTime());
  }

  /**
   * Returns the timestamp as ISO-8601.
   */
  public toISOString(): string {
    return this.#value.toISOString();
  }

  /**
   * Compares timestamps.
   */
  public equals(other: Timestamp): boolean {
    return (
      this.#value.getTime() ===
      other.#value.getTime()
    );
  }

  /**
   * Checks whether this timestamp occurs before another.
   */
  public isBefore(other: Timestamp): boolean {
    return (
      this.#value.getTime() <
      other.#value.getTime()
    );
  }

  /**
   * Checks whether this timestamp occurs after another.
   */
  public isAfter(other: Timestamp): boolean {
    return (
      this.#value.getTime() >
      other.#value.getTime()
    );
  }

  /**
   * Returns the timestamp as a string.
   */
  public toString(): string {
    return this.toISOString();
  }

  /**
   * JSON serialization.
   */
  public toJSON(): string {
    return this.toISOString();
  }
}
