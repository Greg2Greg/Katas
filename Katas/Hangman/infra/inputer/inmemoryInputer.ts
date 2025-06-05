import { Inputer } from '../../models/models.ts';

export class InmemoryInputer implements Inputer {
  constructor(private readonly inputs: string[]) {}

  read(): Promise<string | undefined> {
    const input = this.inputs[0];
    this.inputs.shift();
    return Promise.resolve(input);
  }
}
