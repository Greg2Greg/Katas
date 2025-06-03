import { GuessResult } from '../models/models.ts';

export class GuessComparator {
  constructor(private readonly numberToGuess: number) {}

  public compare(number: number): GuessResult {
    if (number === this.numberToGuess) {
      return 'CORRECT';
    }

    if (number > this.numberToGuess) {
      return 'TOO_HIGH';
    }

    return 'TOO_LOW';
  }
}
