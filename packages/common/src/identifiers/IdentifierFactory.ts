/**
 * ACCS-0001
 * AFM-001
 *
 * Identifier Factory
 */

import { Identifier } from './Identifier';
import { Namespace } from './Namespace';
import type { IdentifierType } from './IdentifierType';
import { IdentifierParser } from './IdentifierParser';
import { IdentifierValidator } from './IdentifierValidator';

export interface CreateIdentifierOptions<
  TNamespace extends string = string,
  TType extends IdentifierType = IdentifierType,
> {
  namespace: TNamespace;
  type: TType;
  localId: string;
}

export class IdentifierFactory {
  /**
   * Creates a canonical Atlas identifier.
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

    return Identifier.create({
      namespace: Namespace.create(options.namespace),
      type: options.type,
      localId: options.localId,
    });
  }

  /**
   * Creates an identifier from a canonical string.
   *
   * Example:
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
   * Creates an entity identifier.
   */
  public static entity(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'entity',
      localId,
    });
  }

  /**
   * Creates a knowledge identifier.
   */
  public static knowledge(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'knowledge',
      localId,
    });
  }

  /**
   * Creates an evidence identifier.
   */
  public static evidence(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'evidence',
      localId,
    });
  }

  /**
   * Creates a claim identifier.
   */
  public static claim(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'claim',
      localId,
    });
  }

  /**
   * Creates a discovery identifier.
   */
  public static discovery(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'discovery',
      localId,
    });
  }

  /**
   * Creates a dataset identifier.
   */
  public static dataset(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'dataset',
      localId,
    });
  }

  /**
   * Creates an observation identifier.
   */
  public static observation(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'observation',
      localId,
    });
  }

  /**
   * Creates a question identifier.
   */
  public static question(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'question',
      localId,
    });
  }

  /**
   * Creates a graph identifier.
   */
  public static graph(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'graph',
      localId,
    });
  }

  /**
   * Creates a user identifier.
   */
  public static user(localId: string) {
    return this.create({
      namespace: 'atlas',
      type: 'user',
      localId,
    });
  }
}
