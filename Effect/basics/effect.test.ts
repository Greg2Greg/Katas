import { Data, Effect } from 'effect';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('Effect | Effect', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Composable computation pipeline, with success', () => {
    /*
        tap: fonctionne uniquement si la précédance est en succès
        tapError: fonctionne si error
        tapBoth: peut fonctionner dans les 2 cas
     */
    const logSpy = vi.spyOn(console, 'log');

    const result = Effect.runSync(
      Effect.succeed(2).pipe(
        Effect.map((value) => value + 1),
        Effect.filterOrFail((value) => value > 0),
        Effect.map((value) => ({ concept: 'Effect', value })),
        Effect.tap(() => {
          console.log('Effect Side-effect');
        })
      )
    );

    expect(result).toEqual({ concept: 'Effect', value: 3 });
    expect(logSpy).toHaveBeenCalledWith('Effect Side-effect');
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  it('Composable computation pipeline, die, interrupt, fail', () => {
    const result = Effect.runSync(
      Effect.succeed(4).pipe(
        Effect.flatMap((value) => {
          switch (value) {
            case 0:
              return Effect.dieMessage('Invariant broken: value should always be > 0');

            case 1:
              // self-interrupt current Fiber
              return Effect.fail(new Error('ET BIM, ERREUR'));

            default:
              return Effect.interrupt;
          }
        }),
        Effect.catchAllDefect(() =>
          Effect.succeed({
            concept: 'Effect',
            error: 'OOPS DEFECT',
          })
        ),
        Effect.catchAll(() =>
          Effect.succeed({
            concept: 'Effect',
            error: 'OOPS FAIL',
          })
        ),
        Effect.catchAllCause(() =>
          Effect.succeed({
            concept: 'Effect',
            error: 'OOPS INTERRUPT',
          })
        )
      )
    );

    // O
    //expect(result).toEqual({ concept: 'Effect', error: 'OOPS DEFECT' });
    // 1
    //expect(result).toEqual({ concept: 'Effect', error: 'OOPS FAIL' });
    // default
    expect(result).toEqual({ concept: 'Effect', error: 'OOPS INTERRUPT' });
  });

  it('Catch a specific error', () => {
    class TooSmallError extends Data.TaggedError('TooSmallError')<{
      readonly min: number;
      readonly actual: number;
    }> {}

    const ensureAtLeast = (min: number, actual: number): Effect.Effect<number, TooSmallError> =>
      actual >= min ? Effect.succeed(actual) : Effect.fail(new TooSmallError({ min, actual }));

    const result = Effect.runSync(
      ensureAtLeast(1, 0).pipe(
        Effect.catchTag('TooSmallError', (error) =>
          Effect.succeed({
            concept: 'Typed errors',
            recovered: true,
            message: `expected >= ${error.min}, got ${error.actual}`,
          })
        )
      )
    );

    expect(result).toEqual({
      concept: 'Typed errors',
      recovered: true,
      message: `expected >= 1, got 0`,
    });
  });

  it('Catch a specific error', () => {
    class TooSmallError extends Data.TaggedError('TooSmallError')<{
      readonly min: number;
      readonly actual: number;
    }> {}

    const ensureAtLeast = (min: number, actual: number): Effect.Effect<number, TooSmallError> =>
      actual >= min ? Effect.succeed(actual) : Effect.fail(new TooSmallError({ min, actual }));

    const result = Effect.runSync(
      ensureAtLeast(1, 0).pipe(
        Effect.catchTag('TooSmallError', (error) =>
          Effect.succeed({
            concept: 'Typed errors',
            recovered: true,
            message: `expected >= ${error.min}, got ${error.actual}`,
          })
        )
      )
    );

    expect(result).toEqual({
      concept: 'Typed errors',
      recovered: true,
      message: `expected >= 1, got 0`,
    });
  });

  it('Fiber failure', () => {
    expect(() => Effect.runSync(Effect.fail(''))).toThrow();
  });
});
