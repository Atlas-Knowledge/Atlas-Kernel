/**
 * ACCS-0001
 * AFM-001
 *
 * Canonical Atlas Identifier
 */

import type { IdentifierType } from './IdentifierType';
import { Namespace } from './Namespace';

/**
 * Immutable canonical Atlas identifier.
 *
 * Format:
 *
 * namespace:type:localId
 *
 * Example:
 *
 * atlas:entity:earth
 */
export class Identifier<
  TNamespace extends string = string,
  TType extends IdentifierType = IdentifierType,
> {
  readonly #namespace: Namespace;
  readonly #type: TType;
  readonly #localId: string;
  readonly #value: `${TNamespace}:${TType}:${string}`;

  /**
   * Constructor is intentionally private.
   *
   * Instances MUST be created through IdentifierFactory.
   */
  private constructor(
    namespace: Namespace,
    type: TType,
    localId: string,
  ) {
    this.#namespace = namespace;
    this.#type = type;
    this.#localId = localId;

    this.#value =
      `${namespace.value}:${type}:${localId}` as `${TNamespace}:${TType}:${string}`;

    Object.freeze(this);
  }

  /**
   * @internal
   *
   * Creates an Identifier instance.
   *
   * This method is intended to be used exclusively by IdentifierFactory.
   */
  public static unsafeCreate<
    TNamespace extends string,
    TType extends IdentifierType,
  >(
    namespace: Namespace,
    type: TType,
    localId: string,
  ): Identifier<TNamespace, TType> {
    return new Identifier(
      namespace,
      type,
      localId,
    ) as Identifier<TNamespace, TType>;
  }

  /**
   * Canonical identifier value.
   */
  public get value(): `${TNamespace}:${TType}:${string}` {
    return this.#value;
  }

  /**
   * Namespace.
   */
  public get namespace(): Namespace {
    return this.#namespace;
  }

  /**
   * Identifier type.
   */
  public get type(): TType {
    return this.#type;
  }

  /**
   * Local identifier.
   */
  public get localId(): string {
    return this.#localId;
  }

  /**
   * Returns the canonical identifier string.
   */
  public toString(): string {
    return this.#value;
  }

  /**
   * JSON serialization.
   */
  public toJSON(): string {
    return this.#value;
  }

  /**
   * Equality comparison.
   */
  public equals(
    other: Identifier<string, IdentifierType>,
  ): boolean {
    return this.#value === other.value;
  }
}
