import { Outputer } from '../../models/models.ts';

export class ConsoleOutputer implements Outputer {
  log(value: string): void {
    console.log(value);
  }
}
