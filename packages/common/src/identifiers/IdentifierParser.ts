/**
 * ACCS-0001
 * AFM-001
 *
 * Identifier Parser
 */

import type { IdentifierType } from './IdentifierType';
import { IdentifierParseError } from './errors';
import { IDENTIFIER_SEPARATOR } from './constants';
import type { ParsedIdentifier } from './interfaces/ParsedIdentifier';

export class IdentifierParser {
  /**
   * Parses a canonical Atlas identifier.
   *
   * Example:
   *
   * atlas:entity:earth
   */
  public static parse(identifier: string): ParsedIdentifier {
    const parts = identifier.split(IDENTIFIER_SEPARATOR);

    if (parts.length !== 3) {
      throw new IdentifierParseError(identifier);
    }

    const [namespace, type, localId] = parts;

    if (!namespace || !type || !localId) {
      throw new IdentifierParseError(identifier);
    }

    return {
      namespace,
      type: type as IdentifierType,
      localId,
    };
  }

  /**
   * Tries to parse an identifier.
   *
   * Returns null instead of throwing.
   */
  public static tryParse(
    identifier: string,
  ): ParsedIdentifier | null {
    try {
      return this.parse(identifier);
    } catch {
      return null;
    }
  }

  /**
   * Returns true if the identifier
   * can be parsed.
   */
  public static canParse(
    identifier: string,
  ): boolean {
    return this.tryParse(identifier) !== null;
  }
}
