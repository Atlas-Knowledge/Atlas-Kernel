import type { IdentifierType } from '../IdentifierType';

/**
 * Parsed canonical identifier.
 */
export interface ParsedIdentifier {
  readonly namespace: string;

  readonly type: IdentifierType;

  readonly localId: string;
}
