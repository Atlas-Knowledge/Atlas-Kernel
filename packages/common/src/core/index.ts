/**
 * Atlas Kernel
 *
 * Core Public API
 */

/* Result */
export {
  err,
  isErr,
  isOk,
  ok,
} from './Result';

export type {
  Failure,
  Result,
  Success,
} from './Result';

/* Option */
export {
  isNone,
  isSome,
  none,
  some,
} from './Option';

export type {
  None,
  Option,
  Some,
} from './Option';

/* Domain */
export {
  DomainError,
  createDomainError,
} from './DomainError';

export type {
  DomainErrorOptions,
} from './DomainError';

/* Guards & Assertions */
export { Guard } from './Guard';

export { Assertion } from './Assertion';

/* Value Objects */
export { ValueObject } from './ValueObject';

/* Identity */
export { UniqueEntityId } from './UniqueEntityId';

/* Entities */
export {
  Entity,
} from './Entity';

export type {
  EntityProps,
} from './Entity';

/* Domain Events */
export {
  DomainEvent,
} from './DomainEvent';

export type {
  DomainEventProps,
} from './DomainEvent';

/* Aggregate Root */
export {
  AggregateRoot,
} from './AggregateRoot';

/* Timestamp */
export {
  Timestamp,
} from './Timestamp';
