/**
 * ACCS-0001
 *
 * Base Value Object
 *
 * All immutable value objects in Atlas Kernel
 * should extend this class.
 */
export abstract class ValueObject<TValue> {
  protected readonly _value: Readonly<TValue>;

  protected constructor(value: TValue) {
    this._value = Object.freeze(value);
    Object.freeze(this);
  }

  /**
   * Underlying immutable value.
   */
  public get value(): Readonly<TValue> {
    return this._value;
  }

  /**
   * Equality comparison.
   */
  public equals(other: ValueObject<TValue>): boolean {
    return JSON.stringify(this._value) === JSON.stringify(other.value);
  }

  /**
   * JSON serialization.
   */
  public toJSON(): TValue {
    return this._value;
  }

  /**
   * String representation.
   */
  public toString(): string {
    return JSON.stringify(this._value);
  }
}
