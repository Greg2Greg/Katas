import { GameState, Inputer, Outputer, RandomNumberGenerator } from '../models/models.ts';
import { GuessComparator } from './guessComparator.ts';

/*
 L'output doit également être abstraite étant donné qu'elle est liée
 à l'interface avec laquelle on interagit. Un return programmatique 
 correspond à une output de la CLI.

 Pas beaucoup de logique riche encapsulée ici, hormis le GuessComparator.
 Le reste c'est du test de collaboration entre objet contenu dans 
 l'orchestrateur Game. 

 Game est un orchestrateur comme Bowling. La différence avec le Bowling 
 c'est qu'on appelait roll x fois. Ici, on a une API définie où on à un .start 
 et ensuite tout se déroule. Ca aurait pu être pareil avec le bowling. Ca dépend 
 comment on veut modéliser notre API, ici le wishful thinking nous a fait partir
 sur un .start()

 L'infra hormis inmemory c'est chiant à tester sans utiliser les mocks. Math.floor() 
 pareil, il faudrait mock ou property-based testing. Game est GuessComparator sont
 eux, plutôt facile à tester. Game un peu plus complexe car il fait orchestrateur
 entre plusieurs objets, il contient pas mal de dépendances externes, l'API
 publique de ces dépendances doit être bien définie.
*/
const MAX_ATTEMPS = 10;
export class Game {
  private state: GameState = 'IN_PROGRESS';
  private attemps = 0;
  private readonly numberToGuess: number;
  private readonly guessComparator: GuessComparator;

  constructor(
    private readonly inputer: Inputer,
    private readonly outputer: Outputer,
    private readonly randomNumberGenerator: RandomNumberGenerator
  ) {
    this.numberToGuess = this.randomNumberGenerator.generate();
    this.guessComparator = new GuessComparator(this.numberToGuess);
  }

  async start() {
    while (this.isGameInProgress()) {
      await this.guess();
    }

    this.logEndGameReason();
  }

  private async guess(): Promise<void> {
    const inputNumber = await this.inputer.read();

    if (inputNumber === 'NOT_A_VALID_NUMBER') {
      this.outputer.log('NOT_A_VALID_NUMBER');
      return;
    }

    const result = this.guessComparator.compare(inputNumber);
    this.attemps++;

    if (result === 'CORRECT') {
      this.outputer.log('CORRECT');
      this.state = 'RESOLVED';
      return;
    }

    if (result === 'TOO_HIGH') {
      this.outputer.log('TOO_HIGH');
      return;
    }

    this.outputer.log('TOO_LOW');
  }

  private isGameInProgress(): boolean {
    if (this.state === 'RESOLVED') {
      return false;
    }

    if (this.attemps === MAX_ATTEMPS) {
      this.state = 'TOO_MANY_ATTEMPTS';
      return false;
    }

    return true;
  }

  private logEndGameReason() {
    switch (this.state) {
      case 'RESOLVED':
        this.outputer.log('RESOLVED');
        break;

      case 'TOO_MANY_ATTEMPTS':
        this.outputer.log('TOO_MANY_ATTEMPTS');
        break;
    }
  }
}
