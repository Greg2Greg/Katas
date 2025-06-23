import { Inputer } from '../../models/models.ts';

export class InmemoryInputer implements Inputer {
  constructor(private numbersReturned: number[]) {
    this.numbersReturned = numbersReturned;
  }

  async read(): Promise<number | null> {
    const numberToReturn = this.numbersReturned[0];
    this.numbersReturned.shift();

    if (!numberToReturn) {
      return null;
    }

    return numberToReturn;
  }
}
