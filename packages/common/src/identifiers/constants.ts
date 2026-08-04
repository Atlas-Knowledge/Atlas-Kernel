/**
 * ACCS-0001
 * AFM-001
 *
 * Identifier Constants
 */

/**
 * Canonical separator used in Atlas identifiers.
 *
 * Example:
 * atlas:entity:earth
 */
export const IDENTIFIER_SEPARATOR = ':';

/**
 * Maximum allowed identifier length.
 */
export const MAX_IDENTIFIER_LENGTH = 255;

/**
 * Minimum allowed identifier length.
 */
export const MIN_IDENTIFIER_LENGTH = 3;

/**
 * Default Atlas namespace.
 */
export const DEFAULT_NAMESPACE = 'atlas';

/**
 * Regular expression for namespace validation.
 */
export const NAMESPACE_REGEX = /^[a-z][a-z0-9-]*$/;

/**
 * Regular expression for identifier type validation.
 */
export const IDENTIFIER_TYPE_REGEX = /^[a-z][a-z0-9-]*$/;

/**
 * Regular expression for local identifier validation.
 */
export const LOCAL_IDENTIFIER_REGEX =
  /^[A-Za-z0-9._-]+$/;

/**
 * Canonical Atlas Identifier format.
 *
 * namespace:type:localId
 *
 * Example:
 *
 * atlas:entity:earth
 */
export const CANONICAL_IDENTIFIER_REGEX =
  /^[a-z][a-z0-9-]*:[a-z][a-z0-9-]*:[A-Za-z0-9._-]+$/;
