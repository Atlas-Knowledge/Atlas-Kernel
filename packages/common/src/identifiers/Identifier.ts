/**
 * ACCS-0001
 * AFM-001
 *
 * Canonical Identifier Value Object
 */

export class Identifier {
  readonly #value: string;

  constructor(value: string) {
    const normalized = value.trim();

    if (!normalized) {
      throw new Error('Identifier cannot be empty.');
    }

    this.#value = normalized;
  }

  /**
   * Returns the identifier value.
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
  public equals(other: Identifier): boolean {
    return this.#value === other.value;
  }

  /**
   * Factory method.
   */
  public static create(value: string): Identifier {
    return new Identifier(value);
  }
}
