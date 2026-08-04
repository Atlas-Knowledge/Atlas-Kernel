/**
 * ACCS-0001
 * AFM-001
 *
 * Canonical Atlas Identifier
 */

import type { IdentifierType } from './IdentifierType';
import { Namespace } from './Namespace';

/**
 * Generic immutable Atlas identifier.
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
  }

  /**
   * Creates a new canonical identifier.
   */
  public static create<
    TNamespace extends string,
    TType extends IdentifierType,
  >(params: {
    namespace: Namespace;
    type: TType;
    localId: string;
  }): Identifier<TNamespace, TType> {
    return new Identifier(
      params.namespace,
      params.type,
      params.localId,
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
   * String representation.
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
    other: Identifier<unknown extends string ? string : string, IdentifierType>,
  ): boolean {
    return this.#value === other.value;
  }
}
