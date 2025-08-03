import { describe, test, expect, vi } from 'vitest';
import { InmemoryInputer } from '../infra/inputer/inmemoryInputer.ts';
import { ConsoleOutputer } from '../infra/outputer/consoleOutputer.ts';
import { StubRandomNumberGenerator } from '../infra/randomNumberGenerator/stubRandomNumberGenerator.ts';
import { Game } from './game.ts';

/*
  J'ai mocké l'outputer ici, en réalité c'est un in-memory, j'aurai
  très bien pu créer une structure interne messages[] dans laquelle je 
  check si les messages sont dans le bon ordre etc. Mais c'est un détail
  ici. Pour autant, c'est pas parce qu'il y a un Spy que c'est un test
  d'intégration.
*/
describe('Magic number', () => {
  test('Should display correct', async () => {
    const inputer = new InmemoryInputer([40]);
    const outputer = new ConsoleOutputer();
    const randomGenerator = new StubRandomNumberGenerator(40);
    const game = new Game(inputer, outputer, randomGenerator);
    const outputerLogSpy = vi.spyOn(outputer, 'log');

    await game.start();
    expect(outputerLogSpy).toHaveBeenCalledWith('CORRECT');
  });

  test('Should display correct after 2 too high and 2 too low', async () => {
    const inputer = new InmemoryInputer([50, 50, 10, 10, 40]);
    const outputer = new ConsoleOutputer();
    const randomGenerator = new StubRandomNumberGenerator(40);
    const game = new Game(inputer, outputer, randomGenerator);
    const outputerLogSpy = vi.spyOn(outputer, 'log');

    await game.start();

    expectToBeCalledTimesWith({ spy: outputerLogSpy, expectedValue: 'TOO_LOW', expectedTimesToBeCalled: 2 });
    expectToBeCalledTimesWith({ spy: outputerLogSpy, expectedValue: 'TOO_HIGH', expectedTimesToBeCalled: 2 });
    expectToBeCalledTimesWith({ spy: outputerLogSpy, expectedValue: 'CORRECT', expectedTimesToBeCalled: 1 });
    expectToBeCalledTimesWith({ spy: outputerLogSpy, expectedValue: 'RESOLVED', expectedTimesToBeCalled: 1 });
  });
});

test('Should display too many attemps', async () => {
  const inputer = new InmemoryInputer([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const outputer = new ConsoleOutputer();
  const randomGenerator = new StubRandomNumberGenerator(40);
  const game = new Game(inputer, outputer, randomGenerator);
  const outputerLogSpy = vi.spyOn(outputer, 'log');

  await game.start();

  expectToBeCalledTimesWith({ spy: outputerLogSpy, expectedValue: 'TOO_LOW', expectedTimesToBeCalled: 10 });
  expectToBeCalledTimesWith({
    spy: outputerLogSpy,
    expectedValue: 'TOO_MANY_ATTEMPTS',
    expectedTimesToBeCalled: 1,
  });
});

function expectToBeCalledTimesWith(input: {
  spy: vi.SpyInstance;
  expectedValue: unknown;
  expectedTimesToBeCalled: number;
}) {
  const { spy, expectedTimesToBeCalled, expectedValue } = input;
  const timesCalled = spy.mock.calls.filter((call) => call[0] === expectedValue).length;

  expect(timesCalled).toBe(expectedTimesToBeCalled);
}
