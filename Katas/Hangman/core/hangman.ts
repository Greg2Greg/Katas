import { Inputer, Outputer } from '../models/models.ts';
import { HangmanGuesser, HangmanGuesserEvents, HangmanObserver } from './hangmanGuesser.ts';

type State = 'STARTED' | 'HANGED' | 'TOO_MANY_ATTEMPTS';
/*
  Hangman lui, contrairement au Guesser, utiliser des dépendances 
  (outputer, inputer, ...). Ca demande du inmemory, et qui dit 
  inmemory dit des tests d'intégrations puisqu'on substitue une 
  vraie dépendance qu'il falloir tester à la frontière.

  On pourrait rajouter un word generator, afficher le mot lorsqu'on
  arrive pas à la trouver ainsi que le nombre d'essai restant.

  Je le fais pas ici parce que c'est plutôt trivial et que ce TDD
  ressemble au Bowling et au MagicNumber.
*/
export class HangmanGame implements HangmanObserver {
  private readonly hangmanGuesser: HangmanGuesser;
  private numberOfAttemps = 0;
  private state: State = 'STARTED';

  constructor(
    private readonly wordToGuess: string,
    private readonly inputer: Inputer,
    private readonly outputer: Outputer,
    private readonly maxAttemps: number = 15
  ) {
    this.hangmanGuesser = new HangmanGuesser(this.wordToGuess);
    this.hangmanGuesser.attach(this);
  }

  async start() {
    while (this.isHangmanInProgress()) {
      const input = await this.inputer.read();

      if (!input) {
        return;
      }

      this.hangmanGuesser.guess(input);
      this.outputer.display(this.hangmanGuesser.currentProgress);
    }

    if (this.state === 'HANGED') {
      this.outputer.display('HANGED');
    }

    if (this.state === 'TOO_MANY_ATTEMPTS') {
      this.outputer.display('TOO_MANY_ATTEMPTS');
    }
  }

  onHangmanNotification(event: HangmanGuesserEvents): void {
    switch (event.type) {
      case 'ADD_ATTEMPT': {
        this.numberOfAttemps++;
        if (this.numberOfAttemps === this.maxAttemps) {
          this.state = 'TOO_MANY_ATTEMPTS';
        }
        break;
      }

      case 'HANGED': {
        this.state = 'HANGED';
        break;
      }
    }
  }

  private isHangmanInProgress() {
    if (this.state === 'HANGED' || this.state === 'TOO_MANY_ATTEMPTS') {
      return false;
    }

    return true;
  }
}
