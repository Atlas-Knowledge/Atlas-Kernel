/**
 * ACCS-0001
 * AFM-001
 *
 * Identifier Validator
 */

import {
  CANONICAL_IDENTIFIER_REGEX,
  IDENTIFIER_TYPE_REGEX,
  LOCAL_IDENTIFIER_REGEX,
  MAX_IDENTIFIER_LENGTH,
  MIN_IDENTIFIER_LENGTH,
  NAMESPACE_REGEX,
} from './constants';

import {
  InvalidIdentifierError,
  InvalidIdentifierTypeError,
  InvalidLocalIdentifierError,
  InvalidNamespaceError,
} from './errors';

export class IdentifierValidator {
  /**
   * Returns true if the namespace is valid.
   */
  public static isValidNamespace(namespace: string): boolean {
    return NAMESPACE_REGEX.test(namespace);
  }

  /**
   * Returns true if the identifier type is valid.
   */
  public static isValidType(type: string): boolean {
    return IDENTIFIER_TYPE_REGEX.test(type);
  }

  /**
   * Returns true if the local identifier is valid.
   */
  public static isValidLocalId(localId: string): boolean {
    return LOCAL_IDENTIFIER_REGEX.test(localId);
  }

  /**
   * Returns true if the canonical identifier is valid.
   */
  public static isCanonical(value: string): boolean {
    return CANONICAL_IDENTIFIER_REGEX.test(value);
  }

  /**
   * Validates namespace.
   */
  public static validateNamespace(namespace: string): void {
    if (!this.isValidNamespace(namespace)) {
      throw new InvalidNamespaceError(namespace);
    }
  }

  /**
   * Validates identifier type.
   */
  public static validateType(type: string): void {
    if (!this.isValidType(type)) {
      throw new InvalidIdentifierTypeError(type);
    }
  }

  /**
   * Validates local identifier.
   */
  public static validateLocalId(localId: string): void {
    if (!this.isValidLocalId(localId)) {
      throw new InvalidLocalIdentifierError(localId);
    }
  }

  /**
   * Validates a canonical identifier.
   */
  public static validateCanonical(identifier: string): void {
    if (identifier.length < MIN_IDENTIFIER_LENGTH) {
      throw new InvalidIdentifierError(identifier);
    }

    if (identifier.length > MAX_IDENTIFIER_LENGTH) {
      throw new InvalidIdentifierError(identifier);
    }

    if (!this.isCanonical(identifier)) {
      throw new InvalidIdentifierError(identifier);
    }
  }
}
