import { Outputer } from '../../models/models.ts';

export class InmemoryOutputer implements Outputer {
  outputs = new Array<string>();

  display(output: string) {
    this.outputs.push(output);
  }
}
