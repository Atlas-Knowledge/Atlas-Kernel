/**
 * Common contract for identifier-like objects.
 */
export interface IdentifierLike {
  readonly value: string;

  toString(): string;

  toJSON(): string;
}
