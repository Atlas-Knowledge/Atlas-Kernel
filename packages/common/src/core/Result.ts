/**
 * Atlas Kernel
 *
 * Core Result Type
 *
 * Represents either a successful value or a failure.
 */

export type Result<TValue, TError> =
  | Success<TValue>
  | Failure<TError>;

export interface Success<TValue> {
  readonly success: true;
  readonly value: TValue;
}

export interface Failure<TError> {
  readonly success: false;
  readonly error: TError;
}

/**
 * Creates a successful Result.
 */
export function ok<TValue>(
  value: TValue,
): Success<TValue> {
  return Object.freeze({
    success: true as const,
    value,
  });
}

/**
 * Creates a failed Result.
 */
export function err<TError>(
  error: TError,
): Failure<TError> {
  return Object.freeze({
    success: false as const,
    error,
  });
}

/**
 * Type guard for successful Results.
 */
export function isOk<TValue, TError>(
  result: Result<TValue, TError>,
): result is Success<TValue> {
  return result.success;
}

/**
 * Type guard for failed Results.
 */
export function isErr<TValue, TError>(
  result: Result<TValue, TError>,
): result is Failure<TError> {
  return !result.success;
}
