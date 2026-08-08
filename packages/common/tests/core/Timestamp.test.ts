import { describe, expect, it } from 'vitest';

import { DomainError } from '../../src/core/DomainError';
import { Timestamp } from '../../src/core/Timestamp';

describe('Timestamp', () => {
  it('creates the current timestamp', () => {
    const before = Date.now();

    const timestamp = Timestamp.now();

    const after = Date.now();

    expect(timestamp.value).toBeInstanceOf(Date);

    expect(timestamp.value.getTime()).toBeGreaterThanOrEqual(
      before,
    );

    expect(timestamp.value.getTime()).toBeLessThanOrEqual(
      after,
    );
  });

  it('creates a timestamp from a Date', () => {
    const date = new Date(
      '2026-01-01T00:00:00.000Z',
    );

    const timestamp = Timestamp.fromDate(date);

    expect(timestamp.toISOString()).toBe(
      '2026-01-01T00:00:00.000Z',
    );
  });

  it('creates a timestamp from an ISO string', () => {
    const timestamp =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    expect(timestamp.toISOString()).toBe(
      '2026-01-01T00:00:00.000Z',
    );
  });

  it('normalizes valid ISO timestamps to UTC', () => {
    const timestamp =
      Timestamp.fromISOString(
        '2026-01-01T03:00:00.000+03:00',
      );

    expect(timestamp.toISOString()).toBe(
      '2026-01-01T00:00:00.000Z',
    );
  });

  it('rejects an invalid Date', () => {
    const invalidDate = new Date(
      Number.NaN,
    );

    expect(() =>
      Timestamp.fromDate(invalidDate),
    ).toThrow(DomainError);
  });

  it('rejects an invalid ISO timestamp', () => {
    expect(() =>
      Timestamp.fromISOString(
        'not-a-timestamp',
      ),
    ).toThrow(DomainError);
  });

  it('creates a defensive copy when returning value', () => {
    const timestamp =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    const value = timestamp.value;

    value.setFullYear(2000);

    expect(timestamp.toISOString()).toBe(
      '2026-01-01T00:00:00.000Z',
    );
  });

  it('supports equality', () => {
    const first =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    const second =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    expect(first.equals(second)).toBe(true);
  });

  it('detects different timestamps', () => {
    const first =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    const second =
      Timestamp.fromISOString(
        '2026-01-02T00:00:00.000Z',
      );

    expect(first.equals(second)).toBe(false);
  });

  it('detects timestamps before another timestamp', () => {
    const first =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    const second =
      Timestamp.fromISOString(
        '2026-01-02T00:00:00.000Z',
      );

    expect(first.isBefore(second)).toBe(true);
    expect(second.isBefore(first)).toBe(false);
  });

  it('detects timestamps after another timestamp', () => {
    const first =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    const second =
      Timestamp.fromISOString(
        '2026-01-02T00:00:00.000Z',
      );

    expect(second.isAfter(first)).toBe(true);
    expect(first.isAfter(second)).toBe(false);
  });

  it('returns false for equal timestamps when comparing before', () => {
    const first =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    const second =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    expect(first.isBefore(second)).toBe(false);
  });

  it('returns false for equal timestamps when comparing after', () => {
    const first =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    const second =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    expect(first.isAfter(second)).toBe(false);
  });

  it('supports toString()', () => {
    const timestamp =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    expect(timestamp.toString()).toBe(
      '2026-01-01T00:00:00.000Z',
    );
  });

  it('supports toJSON()', () => {
    const timestamp =
      Timestamp.fromISOString(
        '2026-01-01T00:00:00.000Z',
      );

    expect(timestamp.toJSON()).toBe(
      '2026-01-01T00:00:00.000Z',
    );
  });
});
