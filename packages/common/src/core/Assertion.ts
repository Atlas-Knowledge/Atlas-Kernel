/**
 * Atlas Kernel
 *
 * Core Assertion Utilities
 */

import { DomainError } from './DomainError';

export class Assertion {
  public static that(
    condition: boolean,
    message: string,
  ): asserts condition {
    if (!condition) {
      throw new DomainError({
        code: 'CORE_ASSERTION_FAILED',
        message,
      });
    }
  }

  public static defined<T>(
    value: T | null | undefined,
    message = 'Expected value to be defined.',
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new DomainError({
        code: 'CORE_ASSERTION_DEFINED',
        message,
      });
    }
  }

  public static nonEmpty(
    value: string,
    message = 'Expected a non-empty string.',
  ): void {
    if (value.trim().length === 0) {
      throw new DomainError({
        code: 'CORE_ASSERTION_NON_EMPTY',
        message,
      });
    }
  }

  public static equal<T>(
    actual: T,
    expected: T,
    message = 'Values are not equal.',
  ): void {
    if (!Object.is(actual, expected)) {
      throw new DomainError({
        code: 'CORE_ASSERTION_EQUAL',
        message,
      });
    }
  }

  public static not(
    condition: boolean,
    message: string,
  ): void {
    if (condition) {
      throw new DomainError({
        code: 'CORE_ASSERTION_NOT',
        message,
      });
    }
  }
}
