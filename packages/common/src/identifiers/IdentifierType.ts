/**
 * ACCS-0001
 * AFM-001
 *
 * Atlas Identifier Types
 */

/**
 * Canonical Atlas identifier types.
 */
export const IdentifierTypes = {
  Entity: 'entity',
  Evidence: 'evidence',
  Claim: 'claim',
  Knowledge: 'knowledge',
  Dataset: 'dataset',
  Observation: 'observation',
  Question: 'question',
  Discovery: 'discovery',
  User: 'user',
  Graph: 'graph',
  Node: 'node',
  Edge: 'edge',
} as const;

/**
 * Identifier type literal.
 */
export type IdentifierType =
  (typeof IdentifierTypes)[keyof typeof IdentifierTypes];

/**
 * Returns every supported identifier type.
 */
export function getIdentifierTypes(): readonly IdentifierType[] {
  return Object.values(IdentifierTypes);
}

/**
 * Checks whether a value is a valid identifier type.
 */
export function isIdentifierType(
  value: string,
): value is IdentifierType {
  return getIdentifierTypes().includes(value as IdentifierType);
}
