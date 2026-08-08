/**
 * Atlas Kernel
 *
 * Unique Entity Identifier
 *
 * Provides a stable identity value for Domain Entities.
 */

import { randomUUID } from 'node:crypto';

import { DomainError } from './DomainError';

const UNIQUE_ENTITY_ID_MAX_LENGTH = 255;
const UNIQUE_ENTITY_ID_MIN_LENGTH = 1;

/**
 * Immutable unique entity identifier.
 */
export class UniqueEntityId {
  readonly #value: string;

  private constructor(value: string) {
    this.#value = value;
  }

  /**
   * Creates a new unique entity identifier.
   */
  public static create(): UniqueEntityId {
    return new UniqueEntityId(randomUUID());
  }

  /**
   * Creates an identifier from an existing value.
   */
  public static fromString(
    value: string,
  ): UniqueEntityId {
    const normalized = value.trim();

    if (
      normalized.length <
      UNIQUE_ENTITY_ID_MIN_LENGTH
    ) {
      throw new DomainError({
        code: 'CORE_ENTITY_ID_EMPTY',
        message:
          'Entity identifier cannot be empty.',
      });
    }

    if (
      normalized.length >
      UNIQUE_ENTITY_ID_MAX_LENGTH
    ) {
      throw new DomainError({
        code: 'CORE_ENTITY_ID_TOO_LONG',
        message:
          'Entity identifier exceeds the maximum allowed length.',
      });
    }

    return new UniqueEntityId(normalized);
  }

  /**
   * Returns the identifier value.
   */
  public get value(): string {
    return this.#value;
  }

  /**
   * Compares two entity identifiers.
   */
  public equals(
    other: UniqueEntityId,
  ): boolean {
    return this.#value === other.value;
  }

  /**
   * String representation.
   */
  public toString(): string {
    return this.#value;
  }

  /**
   * JSON serialization.
   */
  public toJSON(): string {
    return this.#value;
  }
}
