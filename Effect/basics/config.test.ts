import { Config, ConfigProvider, Effect } from 'effect';
import { describe, expect, it } from 'vitest';

describe('Effect | Config', () => {
  it('loads typed configuration with a default value', () => {
    const AppConfig = Config.all({
      appName: Config.string('APP_NAME'),
      port: Config.number('APP_PORT').pipe(Config.withDefault(3000)),
    });

    const result = Effect.runSync(
      Effect.withConfigProvider(ConfigProvider.fromMap(new Map([['APP_NAME', 'Effect demo']])))(AppConfig)
    );

    expect(result).toEqual({
      appName: 'Effect demo',
      port: 3000,
    });
  });
});
