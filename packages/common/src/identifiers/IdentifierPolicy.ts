/**
 * ACCS-0001
 * AFM-001
 *
 * Identifier Policy
 */

import type { IdentifierType } from './IdentifierType';
import { IdentifierTypes } from './IdentifierType';

export class IdentifierPolicy {
  /**
   * Default namespace.
   */
  public static readonly DEFAULT_NAMESPACE = 'atlas';

  /**
   * Reserved namespaces.
   */
  public static readonly RESERVED_NAMESPACES = new Set<string>([
    'atlas',
    'tec',
    'w3c',
    'ietf',
    'iso',
    'github',
  ]);

  /**
   * Allowed identifier types.
   */
  public static readonly ALLOWED_TYPES = new Set<IdentifierType>(
    Object.values(IdentifierTypes),
  );

  /**
   * Returns true if the namespace is reserved.
   */
  public static isReservedNamespace(namespace: string): boolean {
    return this.RESERVED_NAMESPACES.has(namespace);
  }

  /**
   * Returns true if the identifier type is allowed.
   */
  public static isAllowedType(type: string): type is IdentifierType {
    return this.ALLOWED_TYPES.has(type as IdentifierType);
  }

  /**
   * Registers a new namespace.
   *
   * Intended for plugins or extensions.
   */
  public static registerNamespace(namespace: string): void {
    this.RESERVED_NAMESPACES.add(namespace);
  }

  /**
   * Registers a new identifier type.
   */
  public static registerType(type: IdentifierType): void {
    this.ALLOWED_TYPES.add(type);
  }
}
