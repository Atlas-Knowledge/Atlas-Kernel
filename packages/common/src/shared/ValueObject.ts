/**
 * ACCS-0001
 *
 * Base Value Object
 *
 * Foundation for all immutable value objects
 * in Atlas Kernel.
 */

export abstract class ValueObject<TValue extends object> {
  protected readonly props: Readonly<TValue>;

  protected constructor(props: TValue) {
    this.props = Object.freeze({ ...props });
    Object.freeze(this);
  }

  /**
   * Returns the immutable properties.
   */
  protected get value(): Readonly<TValue> {
    return this.props;
  }

  /**
   * Structural equality.
   */
  public equals(other: this): boolean {
    return this.deepEqual(this.props, other.props);
  }

  /**
   * JSON serialization.
   */
  public toJSON(): Readonly<TValue> {
    return this.props;
  }

  /**
   * Deep structural comparison.
   */
  private deepEqual(a: unknown, b: unknown): boolean {
    if (Object.is(a, b)) {
      return true;
    }

    if (
      typeof a !== 'object' ||
      typeof b !== 'object' ||
      a === null ||
      b === null
    ) {
      return false;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (
        !this.deepEqual(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
        )
      ) {
        return false;
      }
    }

    return true;
  }
}
