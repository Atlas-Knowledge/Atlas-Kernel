/**
 * ACCS-0001
 * AFM-001
 *
 * Identifier Factory
 */

import { Identifier } from './Identifier';
import { IdentifierParser } from './IdentifierParser';
import { IdentifierPolicy } from './IdentifierPolicy';
import type { IdentifierType } from './IdentifierType';
import { Namespace } from './Namespace';
import { IdentifierValidator } from './IdentifierValidator';

export interface CreateIdentifierOptions<
  TNamespace extends string = string,
  TType extends IdentifierType = IdentifierType,
> {
  readonly namespace: TNamespace;
  readonly type: TType;
  readonly localId: string;
}

/**
 * Public factory responsible for creating
 * canonical Atlas identifiers.
 */
export class IdentifierFactory {
  /**
   * Creates a new identifier.
   */
  public static create<
    TNamespace extends string,
    TType extends IdentifierType,
  >(
    options: CreateIdentifierOptions<TNamespace, TType>,
  ): Identifier<TNamespace, TType> {
    IdentifierValidator.validateNamespace(options.namespace);
    IdentifierValidator.validateType(options.type);
    IdentifierValidator.validateLocalId(options.localId);

    return Identifier.unsafeCreate(
      Namespace.create(options.namespace),
      options.type,
      options.localId,
    );
  }

  /**
   * Creates an identifier from its canonical string.
   *
   * Example:
   *
   * atlas:entity:earth
   */
  public static fromString<
    TNamespace extends string,
    TType extends IdentifierType,
  >(
    identifier: string,
  ): Identifier<TNamespace, TType> {
    IdentifierValidator.validateCanonical(identifier);

    const parsed = IdentifierParser.parse(identifier);

    return this.create({
      namespace: parsed.namespace as TNamespace,
      type: parsed.type as TType,
      localId: parsed.localId,
    });
  }

  /**
   * Creates an Atlas Entity identifier.
   */
  public static entity(
    localId: string,
  ): Identifier<'atlas', 'entity'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'entity',
      localId,
    });
  }

  /**
   * Creates an Atlas Knowledge identifier.
   */
  public static knowledge(
    localId: string,
  ): Identifier<'atlas', 'knowledge'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'knowledge',
      localId,
    });
  }

  /**
   * Creates an Atlas Evidence identifier.
   */
  public static evidence(
    localId: string,
  ): Identifier<'atlas', 'evidence'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'evidence',
      localId,
    });
  }

  /**
   * Creates an Atlas Claim identifier.
   */
  public static claim(
    localId: string,
  ): Identifier<'atlas', 'claim'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'claim',
      localId,
    });
  }

  /**
   * Creates an Atlas Dataset identifier.
   */
  public static dataset(
    localId: string,
  ): Identifier<'atlas', 'dataset'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'dataset',
      localId,
    });
  }

  /**
   * Creates an Atlas Observation identifier.
   */
  public static observation(
    localId: string,
  ): Identifier<'atlas', 'observation'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'observation',
      localId,
    });
  }

  /**
   * Creates an Atlas Question identifier.
   */
  public static question(
    localId: string,
  ): Identifier<'atlas', 'question'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'question',
      localId,
    });
  }

  /**
   * Creates an Atlas Discovery identifier.
   */
  public static discovery(
    localId: string,
  ): Identifier<'atlas', 'discovery'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'discovery',
      localId,
    });
  }

  /**
   * Creates an Atlas User identifier.
   */
  public static user(
    localId: string,
  ): Identifier<'atlas', 'user'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'user',
      localId,
    });
  }

  /**
   * Creates an Atlas Graph identifier.
   */
  public static graph(
    localId: string,
  ): Identifier<'atlas', 'graph'> {
    return this.create({
      namespace: IdentifierPolicy.DEFAULT_NAMESPACE,
      type: 'graph',
      localId,
    });
  }

  /**
   * Creates a custom identifier.
   *
   * Intended for plugins and external namespaces.
   */
  public static custom<
    TNamespace extends string,
    TType extends IdentifierType,
  >(
    namespace: TNamespace,
    type: TType,
    localId: string,
  ): Identifier<TNamespace, TType> {
    return this.create({
      namespace,
      type,
      localId,
    });
  }
      }
