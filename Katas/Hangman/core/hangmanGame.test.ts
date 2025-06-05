import { InmemoryInputer } from '../infra/inputer/inmemoryInputer.ts';
import { InmemoryOutputer } from '../infra/outputer/inmemoryOutputer.ts';
import { HangmanGame } from './hangman.ts';

describe('HangmanGame', () => {
  test('Should should display hangman progress on output', async () => {
    const inputer = new InmemoryInputer(['A', 'N', 'T', 'I', 'C', 'O', 'U', 'L', 'M', 'E', 'S']);
    const outputer = new InmemoryOutputer();
    const hangmanGame = new HangmanGame('ANTICONSTITUTIONNELLEMENT', inputer, outputer);

    await hangmanGame.start();

    expect(outputer.outputs).toEqual(
      expect.arrayContaining([
        'A________________________',
        'AN____N________NN______N_',
        'ANT___N_T_T_T__NN______NT',
        'ANTI__N_TIT_TI_NN______NT',
        'ANTIC_N_TIT_TI_NN______NT',
        'ANTICON_TIT_TIONN______NT',
        'ANTICON_TITUTIONN______NT',
        'ANTICON_TITUTIONN_LL___NT',
        'ANTICON_TITUTIONN_LL_M_NT',
        'ANTICON_TITUTIONNELLEMENT',
        'ANTICONSTITUTIONNELLEMENT',
      ])
    );
  });
  test('Should inform that is hanged', async () => {
    const inputer = new InmemoryInputer(['T']);
    const outputer = new InmemoryOutputer();
    const hangmanGame = new HangmanGame('T', inputer, outputer);

    await hangmanGame.start();

    expect(outputer.outputs).toEqual(expect.arrayContaining(['HANGED']));
  });
  test('Should stop game because of too many attemps', async () => {
    const inputer = new InmemoryInputer(['T', 'T']);
    const outputer = new InmemoryOutputer();
    const hangmanGame = new HangmanGame('A', inputer, outputer, 1);

    await hangmanGame.start();

    expect(outputer.outputs).toEqual(expect.arrayContaining(['TOO_MANY_ATTEMPTS']));
  });
  test('Should not take into account an successfull attempt', async () => {
    const inputer = new InmemoryInputer(['A', 'X']);
    const outputer = new InmemoryOutputer();
    const hangmanGame = new HangmanGame('AB', inputer, outputer, 1);

    await hangmanGame.start();

    expect(outputer.outputs).toEqual(['A_', 'A_', 'TOO_MANY_ATTEMPTS']);
  });
});
