/**
 * Atlas Kernel
 *
 * Core Domain Error
 *
 * Base error type for domain-level failures.
 */

export interface DomainErrorOptions {
  readonly code: string;
  readonly message: string;
  readonly cause?: unknown;
}

/**
 * Base class for all Atlas domain errors.
 */
export class DomainError extends Error {
  public readonly code: string;
  public readonly cause?: unknown;

  constructor(options: DomainErrorOptions) {
    super(options.message);

    this.name = 'DomainError';
    this.code = options.code;
    this.cause = options.cause;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  /**
   * Serializes the error into a safe domain representation.
   */
  public toJSON(): {
    readonly name: string;
    readonly code: string;
    readonly message: string;
  } {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
    };
  }
}

/**
 * Creates a domain error.
 */
export function createDomainError(
  options: DomainErrorOptions,
): DomainError {
  return new DomainError(options);
}
