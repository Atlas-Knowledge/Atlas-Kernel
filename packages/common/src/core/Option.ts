/**
 * Atlas Kernel
 *
 * Core Option Type
 *
 * Represents either the presence or absence of a value.
 */

export type Option<TValue> =
  | Some<TValue>
  | None;

export interface Some<TValue> {
  readonly kind: 'some';
  readonly value: TValue;
}

export interface None {
  readonly kind: 'none';
}

/**
 * Creates an Option containing a value.
 */
export function some<TValue>(
  value: TValue,
): Some<TValue> {
  return Object.freeze({
    kind: 'some' as const,
    value,
  });
}

/**
 * Creates an empty Option.
 */
export function none(): None {
  return Object.freeze({
    kind: 'none' as const,
  });
}

/**
 * Returns true when the Option contains a value.
 */
export function isSome<TValue>(
  option: Option<TValue>,
): option is Some<TValue> {
  return option.kind === 'some';
}

/**
 * Returns true when the Option is empty.
 */
export function isNone<TValue>(
  option: Option<TValue>,
): option is None {
  return option.kind === 'none';
}
