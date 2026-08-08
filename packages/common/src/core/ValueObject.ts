/**
 * Atlas Kernel
 *
 * Core Value Object
 *
 * Base class for immutable Domain-Driven Design
 * Value Objects.
 */

export abstract class ValueObject<TProps extends object> {
  protected readonly props: Readonly<TProps>;

  protected constructor(props: TProps) {
    this.props = Object.freeze({
      ...props,
    });
  }

  /**
   * Returns the immutable properties of the Value Object.
   */
  public get value(): Readonly<TProps> {
    return this.props;
  }

  /**
   * Compares two Value Objects structurally.
   */
  public equals(other: ValueObject<TProps>): boolean {
    return ValueObject.deepEqual(
      this.props,
      other.props,
    );
  }

  /**
   * Serializes the Value Object.
   */
  public toJSON(): Readonly<TProps> {
    return this.props;
  }

  /**
   * Returns a string representation.
   */
  public toString(): string {
    return JSON.stringify(this.props);
  }

  /**
   * Performs a recursive structural comparison.
   */
  private static deepEqual(
    left: unknown,
    right: unknown,
  ): boolean {
    if (Object.is(left, right)) {
      return true;
    }

    if (
      typeof left !== 'object' ||
      typeof right !== 'object' ||
      left === null ||
      right === null
    ) {
      return false;
    }

    if (
      Array.isArray(left) !== Array.isArray(right)
    ) {
      return false;
    }

    if (Array.isArray(left) && Array.isArray(right)) {
      if (left.length !== right.length) {
        return false;
      }

      return left.every((item, index) =>
        ValueObject.deepEqual(
          item,
          right[index],
        ),
      );
    }

    const leftObject =
      left as Record<string, unknown>;

    const rightObject =
      right as Record<string, unknown>;

    const leftKeys = Object.keys(leftObject);
    const rightKeys = Object.keys(rightObject);

    if (leftKeys.length !== rightKeys.length) {
      return false;
    }

    for (const key of leftKeys) {
      if (
        !Object.prototype.hasOwnProperty.call(
          rightObject,
          key,
        )
      ) {
        return false;
      }

      if (
        !ValueObject.deepEqual(
          leftObject[key],
          rightObject[key],
        )
      ) {
        return false;
      }
    }

    return true;
  }
}
