import { Inputer } from '../../models/models.ts';

export class InmemoryInputer implements Inputer {
  constructor(private numbersReturned: number[]) {
    this.numbersReturned = numbersReturned;
  }

  read(): Promise<number> {
    const numberToReturn = this.numbersReturned[0];
    this.numbersReturned.shift();
    return Promise.resolve(numberToReturn);
  }
}
