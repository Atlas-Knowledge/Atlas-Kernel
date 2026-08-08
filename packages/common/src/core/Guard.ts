/**
 * Atlas Kernel
 *
 * Core Guard Utilities
 */

import { DomainError } from './DomainError';

export class Guard {
  public static notNull<T>(
    value: T | null | undefined,
    message = 'Value cannot be null or undefined.',
  ): asserts value is T {
    if (value === null || value === undefined) {
      throw new DomainError({
        code: 'CORE_GUARD_NOT_NULL',
        message,
      });
    }
  }

  public static notEmpty(
    value: string,
    message = 'Value cannot be empty.',
  ): void {
    if (value.trim().length === 0) {
      throw new DomainError({
        code: 'CORE_GUARD_NOT_EMPTY',
        message,
      });
    }
  }

  public static maxLength(
    value: string,
    maximum: number,
    message = `Value cannot exceed ${maximum} characters.`,
  ): void {
    if (value.length > maximum) {
      throw new DomainError({
        code: 'CORE_GUARD_MAX_LENGTH',
        message,
      });
    }
  }

  public static minLength(
    value: string,
    minimum: number,
    message = `Value must contain at least ${minimum} characters.`,
  ): void {
    if (value.length < minimum) {
      throw new DomainError({
        code: 'CORE_GUARD_MIN_LENGTH',
        message,
      });
    }
  }

  public static isTrue(
    condition: boolean,
    message = 'Guard condition failed.',
  ): void {
    if (!condition) {
      throw new DomainError({
        code: 'CORE_GUARD_TRUE',
        message,
      });
    }
  }

  public static isFalse(
    condition: boolean,
    message = 'Guard condition failed.',
  ): void {
    if (condition) {
      throw new DomainError({
        code: 'CORE_GUARD_FALSE',
        message,
      });
    }
  }

  public static string(
    value: unknown,
    message = 'Value must be a string.',
  ): asserts value is string {
    if (typeof value !== 'string') {
      throw new DomainError({
        code: 'CORE_GUARD_STRING',
        message,
      });
    }
  }

  public static nonEmptyArray<T>(
    value: readonly T[],
    message = 'Array cannot be empty.',
  ): void {
    if (value.length === 0) {
      throw new DomainError({
        code: 'CORE_GUARD_NON_EMPTY_ARRAY',
        message,
      });
    }
  }
}
