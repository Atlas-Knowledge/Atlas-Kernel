/**
 * ACCS-0001
 * AFM-001
 *
 * Identifier Errors
 */

/**
 * Base class for all identifier-related errors.
 */
export class AtlasIdentifierError extends Error {
  public readonly name = 'AtlasIdentifierError';

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when an identifier is invalid.
 */
export class InvalidIdentifierError extends AtlasIdentifierError {
  public readonly name = 'InvalidIdentifierError';

  constructor(identifier: string) {
    super(`Invalid identifier: "${identifier}".`);
  }
}

/**
 * Thrown when a namespace is invalid.
 */
export class InvalidNamespaceError extends AtlasIdentifierError {
  public readonly name = 'InvalidNamespaceError';

  constructor(namespace: string) {
    super(`Invalid namespace: "${namespace}".`);
  }
}

/**
 * Thrown when an identifier type is invalid.
 */
export class InvalidIdentifierTypeError extends AtlasIdentifierError {
  public readonly name = 'InvalidIdentifierTypeError';

  constructor(type: string) {
    super(`Invalid identifier type: "${type}".`);
  }
}

/**
 * Thrown when a local identifier is invalid.
 */
export class InvalidLocalIdentifierError extends AtlasIdentifierError {
  public readonly name = 'InvalidLocalIdentifierError';

  constructor(localId: string) {
    super(`Invalid local identifier: "${localId}".`);
  }
}

/**
 * Thrown when a canonical identifier cannot be parsed.
 */
export class IdentifierParseError extends AtlasIdentifierError {
  public readonly name = 'IdentifierParseError';

  constructor(identifier: string) {
    super(`Unable to parse canonical identifier: "${identifier}".`);
  }
}
