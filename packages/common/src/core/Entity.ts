/**
 * Atlas Kernel
 *
 * Core Domain Entity
 *
 * Base class for Domain-Driven Design Entities.
 *
 * An Entity is identified by its UniqueEntityId,
 * not by the equality of its properties.
 */

import { UniqueEntityId } from './UniqueEntityId';

/**
 * Base properties required by every Entity.
 */
export interface EntityProps {
  readonly id: UniqueEntityId;
}

/**
 * Base Domain Entity.
 *
 * TProps represents the entity-specific properties.
 */
export abstract class Entity<
  TProps extends object,
> {
  protected readonly props: TProps;

  protected constructor(props: TProps) {
    this.props = Object.freeze({
      ...props,
    });
  }

  /**
   * Returns the entity's unique identifier.
   */
  public get id(): UniqueEntityId {
    return this.props.id;
  }

  /**
   * Returns the entity properties.
   *
   * The returned object is immutable at the top level.
   */
  public get value(): Readonly<TProps> {
    return this.props;
  }

  /**
   * Determines entity equality by identity.
   *
   * Two entities are equal when their IDs are equal,
   * regardless of their other properties.
   */
  public equals(other: Entity<TProps>): boolean {
    return this.id.equals(other.id);
  }

  /**
   * Serializes the entity.
   */
  public toJSON(): Readonly<TProps> {
    return this.props;
  }
}
