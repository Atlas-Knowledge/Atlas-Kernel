/**
 * ACCS-0001
 * AFM-001
 *
 * Namespace Value Object
 */

import { NAMESPACE_REGEX } from './constants';
import { InvalidNamespaceError } from './errors';

/**
 * Immutable namespace value object.
 */
export class Namespace {
  readonly #value: string;

  private constructor(value: string) {
    this.#value = value;
  }

  /**
   * Creates a validated namespace.
   */
  public static create(value: string): Namespace {
    const normalized = value.trim().toLowerCase();

    if (!NAMESPACE_REGEX.test(normalized)) {
      throw new InvalidNamespaceError(value);
    }

    return new Namespace(normalized);
  }

  /**
   * Namespace value.
   */
  public get value(): string {
    return this.#value;
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

  /**
   * Equality comparison.
   */
  public equals(other: Namespace): boolean {
    return this.#value === other.value;
  }
}
