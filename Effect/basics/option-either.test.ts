import { Effect, Either, Option } from 'effect';
import { describe, expect, it } from 'vitest';

describe('Effect | Option and Either', () => {
  it('Option with value', () => {
    const maybeName = Option.fromNullable('Ada');

    const result = maybeName.pipe(
      Option.map((name) => name.toUpperCase()),
      Option.getOrElse(() => 'ANONYMOUS')
    );

    expect(result).toBe('ADA');
  });
  it('Option without value', () => {
    const t: any = null;
    const maybeName = Option.fromNullable(t);

    const result = maybeName.pipe(
      Option.map((name) => name.toUpperCase()),
      Option.getOrElse(() => 'ANONYMOUS')
    );

    expect(result).toBe('ANONYMOUS');
  });

  it('Effect keeps a typed UserError model', () => {
    type User = {
      readonly name: string;
      readonly age: number;
    };

    type UserError = { readonly _tag: 'InvalidName' } | { readonly _tag: 'InvalidAge'; readonly age: number };

    const createUser = (name: string, age: number): Effect.Effect<User, UserError> => {
      if (name.trim().length === 0) {
        return Effect.fail({ _tag: 'InvalidName' });
      }

      if (age < 18) {
        return Effect.fail({ _tag: 'InvalidAge', age });
      }

      return Effect.succeed({ name, age });
    };

    const result = Effect.runSync(
      createUser('Ada', 12).pipe(
        Effect.catchAll((error) => {
          switch (error._tag) {
            case 'InvalidName':
              return Effect.succeed('Name is required');

            case 'InvalidAge':
              return Effect.succeed(`Age must be >= 18, got ${error.age}`);
          }
        })
      )
    );

    expect(result).toBe('Age must be >= 18, got 12');
  });

  it('Either keeps the same typed UserError model', () => {
    type User = {
      readonly name: string;
      readonly age: number;
    };

    type UserError = { readonly _tag: 'InvalidName' } | { readonly _tag: 'InvalidAge'; readonly age: number };

    const createUser = (name: string, age: number): Either.Either<User, UserError> => {
      if (name.trim().length === 0) {
        return Either.left({ _tag: 'InvalidName' });
      }

      if (age < 18) {
        return Either.left({ _tag: 'InvalidAge', age });
      }

      return Either.right({ name, age });
    };

    const result = createUser('Ada', 12).pipe(
      Either.match({
        onLeft: (error) => {
          switch (error._tag) {
            case 'InvalidName':
              return 'Name is required';

            case 'InvalidAge':
              return `Age must be >= 18, got ${error.age}`;
          }
        },
        onRight: (user) => `${user.name} is valid`,
      })
    );

    expect(result).toBe('Age must be >= 18, got 12');
  });
});
