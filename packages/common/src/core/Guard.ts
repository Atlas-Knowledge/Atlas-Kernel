/**
 * Atlas Kernel
 *
 * Core Guard Utilities
 *
 * Runtime precondition and invariant helpers.
 */

export class Guard {
  /**
   * Ensures a value is not null or undefined.
   */
  public static notNull<T>(
    value: T | null | undefined,
    message = 'Value cannot be null or undefined.',
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new Error(message);
    }
  }

  /**
   * Ensures a string is not empty after trimming.
   */
  public static notEmpty(
    value: string,
    message = 'Value cannot be empty.',
  ): void {
    if (value.trim().length === 0) {
      throw new Error(message);
    }
  }

  /**
   * Ensures a string does not exceed the maximum length.
   */
  public static maxLength(
    value: string,
    maximum: number,
    message = `Value cannot exceed ${maximum} characters.`,
  ): void {
    if (value.length > maximum) {
      throw new Error(message);
    }
  }

  /**
   * Ensures a string meets the minimum length.
   */
  public static minLength(
    value: string,
    minimum: number,
    message = `Value must contain at least ${minimum} characters.`,
  ): void {
    if (value.length < minimum) {
      throw new Error(message);
    }
  }

  /**
   * Ensures a condition is true.
   */
  public static isTrue(
    condition: boolean,
    message = 'Guard condition failed.',
  ): void {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Ensures a condition is false.
   */
  public static isFalse(
    condition: boolean,
    message = 'Guard condition failed.',
  ): void {
    if (condition) {
      throw new Error(message);
    }
  }

  /**
   * Ensures a value is a string.
   */
  public static string(
    value: unknown,
    message = 'Value must be a string.',
  ): asserts value is string {
    if (typeof value !== 'string') {
      throw new Error(message);
    }
  }

  /**
   * Ensures a value is a non-empty array.
   */
  public static nonEmptyArray<T>(
    value: readonly T[],
    message = 'Array cannot be empty.',
  ): void {
    if (value.length === 0) {
      throw new Error(message);
    }
  }
}
