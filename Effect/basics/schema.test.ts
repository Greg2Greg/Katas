import { Effect, Schema } from 'effect';
import { describe, expect, it } from 'vitest';

describe('Effect | Schema', () => {
  it('decodes and validates input data with success', () => {
    const User = Schema.Struct({
      name: Schema.String,
      age: Schema.Number,
    });

    const result = Effect.runSync(
      Schema.decodeUnknown(User)({
        name: 'Ada',
        age: 36,
      })
    );

    expect(result).toEqual({
      name: 'Ada',
      age: 36,
    });
  });
  it('decodes and validates input data with fail', async () => {
    const User = Schema.Struct({
      name: Schema.String,
      age: Schema.Number,
      fail: Schema.Number,
    });

    const result = Effect.runPromise(
      Schema.decodeUnknown(User)({
        name: 'Ada',
        age: 36,
      }).pipe(
        Effect.catchAll(() => {
          return Effect.fail({ fail: 'test' });
        })
      )
    );

    expect(result).rejects.toThrow();
  });
});
