import { HangmanGame } from './core/hangman.ts';
import { ConsoleInputer } from './infra/inputer/consoleInputer.ts';
import { ConsoleOutputer } from './infra/outputer/consoleOutputer.ts';

function main() {
  const game = new HangmanGame('ANOUCHKA', new ConsoleInputer(), new ConsoleOutputer());
  game.start();
}

main();
