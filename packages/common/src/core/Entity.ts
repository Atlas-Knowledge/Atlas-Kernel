/**
 * Atlas Kernel
 *
 * Core Domain Entity
 *
 * Base class for Domain-Driven Design Entities.
 */

import { UniqueEntityId } from './UniqueEntityId';

/**
 * Properties required by every Domain Entity.
 */
export interface EntityProps {
  readonly id: UniqueEntityId;
}

/**
 * Base Domain Entity.
 *
 * Entity equality is based on identity, not properties.
 */
export abstract class Entity<
  TProps extends EntityProps,
> {
  protected readonly props: Readonly<TProps>;

  protected constructor(props: TProps) {
    this.props = Object.freeze({
      ...props,
    });
  }

  /**
   * Returns the unique entity identifier.
   */
  public get id(): UniqueEntityId {
    return this.props.id;
  }

  /**
   * Returns immutable entity properties.
   */
  public get value(): Readonly<TProps> {
    return this.props;
  }

  /**
   * Compares entities by identity.
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
