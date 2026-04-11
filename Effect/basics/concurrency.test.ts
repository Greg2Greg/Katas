import { Effect, Fiber } from 'effect';
import { describe, expect, it } from 'vitest';

describe('Effect | Concurrency', () => {
  it('runs 2 computations in parallel with fibers', async () => {
    const slowDouble = (value: number) => Effect.sleep('10 millis').pipe(Effect.map(() => value * 2));

    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const first = yield* Effect.fork(slowDouble(10));
        const second = yield* Effect.fork(slowDouble(20));

        return yield* Fiber.joinAll([first, second]);
      })
    );

    expect(result).toEqual([20, 40]);
  });
});
