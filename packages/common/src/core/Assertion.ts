/**
 * Atlas Kernel
 *
 * Core Assertion Utilities
 *
 * Assertions are used to enforce invariants that must
 * hold inside the domain.
 */

export class Assertion {
  /**
   * Asserts that a condition is true.
   */
  public static that(
    condition: boolean,
    message: string,
  ): asserts condition {
    if (!condition) {
      throw new Error(message);
    }
  }

  /**
   * Asserts that a value is not null or undefined.
   */
  public static defined<T>(
    value: T | null | undefined,
    message = 'Expected value to be defined.',
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new Error(message);
    }
  }

  /**
   * Asserts that a string is not empty.
   */
  public static nonEmpty(
    value: string,
    message = 'Expected a non-empty string.',
  ): void {
    if (value.trim().length === 0) {
      throw new Error(message);
    }
  }

  /**
   * Asserts that a value equals the expected value.
   */
  public static equal<T>(
    actual: T,
    expected: T,
    message = 'Values are not equal.',
  ): void {
    if (!Object.is(actual, expected)) {
      throw new Error(message);
    }
  }

  /**
   * Asserts that a condition is false.
   */
  public static not(
    condition: boolean,
    message: string,
  ): void {
    if (condition) {
      throw new Error(message);
    }
  }
}
