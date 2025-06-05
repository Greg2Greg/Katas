import { Outputer } from '../../models/models.ts';

export class ConsoleOutputer implements Outputer {
  display(output: string): void {
    console.log(output);
  }
}
