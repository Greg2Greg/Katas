import { Effect, Chunk, Stream } from 'effect';
import { describe, it, expect } from 'vitest';

describe('Effect | Stream', () => {
  it('Composable stream pipeline: finite values and collect as a chunk', () => {
    const result = Effect.runSync(
      Stream.fromIterable([1, 2, 3]).pipe(
        Stream.map((value) => value + 1),
        Stream.map((value) => value * 2),
        Stream.map((value) => ({ concept: 'Stream', value })),
        Stream.runCollect,
        Effect.map(Chunk.toReadonlyArray)
      )
    );

    expect(result).toEqual([
      { concept: 'Stream', value: 4 },
      { concept: 'Stream', value: 6 },
      { concept: 'Stream', value: 8 },
    ]);
  });

  it('Composable stream pipeline: infinite values processed each by each', () => {
    const consumed: Array<{ concept: 'Stream'; value: number }> = [];

    Effect.runSync(
      Stream.iterate(1, (value) => value + 1).pipe(
        Stream.map((value) => value * 10),
        Stream.map((value) => ({ concept: 'Stream' as const, value })),
        Stream.take(4),
        Stream.runForEach((value) =>
          Effect.sync(() => {
            consumed.push(value);
          })
        )
      )
    );

    expect(consumed).toEqual([
      { concept: 'Stream', value: 10 },
      { concept: 'Stream', value: 20 },
      { concept: 'Stream', value: 30 },
      { concept: 'Stream', value: 40 },
    ]);
  });
});
