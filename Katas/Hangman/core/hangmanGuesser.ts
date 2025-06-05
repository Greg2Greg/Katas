/*
  Le guesser n'a pas de dépendance. C'est volontaire, il ne contient
  que de la logique algorithmique. Par conséquent, c'est hautement 
  testable. 

  On aurait pu aller plus loin en ajoutant une méthode display où
  le HangmanGuesser s'affiche par lui-même. J'ai fait le choix ici 
  de mettre à disposition la progression actuelle. Je ne pense pas
  que ça brise l'encapsulation, l'API du guesser est claire.
  
  C'est l'éternel débat entre pure vs pragmatic objects.
*/

export type HangmanGuesserEvents =
  | {
      type: 'HANGED';
    }
  | {
      type: 'ADD_ATTEMPT';
    };

export interface HangmanObserver {
  onHangmanNotification(event: HangmanGuesserEvents): void;
}

export interface HangmanObservable {
  attach(observer: HangmanObserver): void;
  detach(observer: HangmanObserver): void;
}

const UNDERSCORE = '_';
export class HangmanGuesser implements HangmanObservable {
  private hangmanProgress: string;
  private observers = new Array<HangmanObserver>();

  constructor(private readonly wordToGuess: string) {
    this.hangmanProgress = UNDERSCORE.repeat(this.wordToGuess.length);
  }

  guess(letter: string) {
    const indexes = this.findIndexesOfLetter(letter);

    if (indexes.length === 0) {
      this.notifyAddAttemps();
    }

    this.replaceIndexesByLetter(letter, indexes);

    if (this.isHanged()) {
      this.notifyIsHanged();
    }
  }

  isHanged() {
    return !this.hangmanProgress.includes('_');
  }

  attach(observer: HangmanObserver): void {
    this.observers.push(observer);
  }

  detach(observer: HangmanObserver): void {
    return;
  }

  get currentProgress(): string {
    return this.hangmanProgress;
  }

  private findIndexesOfLetter(letter: string): Array<number> {
    const indexes = [];
    for (let i = 0; i < this.wordToGuess.length; i++) {
      if (this.wordToGuess[i] === letter) {
        indexes.push(i);
      }
    }

    return indexes;
  }

  private replaceIndexesByLetter(letter: string, indexes: Array<number>) {
    for (let i = 0; i < indexes.length; i++) {
      this.hangmanProgress =
        this.hangmanProgress.substring(0, indexes[i]) +
        letter +
        this.hangmanProgress.substring(indexes[i] + 1);
    }
  }

  private notifyAddAttemps() {
    this.observers.forEach((observer) => {
      observer.onHangmanNotification({ type: 'ADD_ATTEMPT' });
    });
  }

  private notifyIsHanged() {
    this.observers.forEach((observer) => {
      observer.onHangmanNotification({ type: 'HANGED' });
    });
  }
}
