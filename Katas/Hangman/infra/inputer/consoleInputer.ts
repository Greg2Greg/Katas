import prompt from 'prompt';
import { Inputer } from '../../models/models.ts';

export class ConsoleInputer implements Inputer {
  constructor() {
    prompt.start();
  }

  /*
    C'est une dépendance externe concrète qui vient avec son lot
    de cas à gérer: 

    - Que faire si ce n'est pas un nombre entier ?
    - Que faire si l'utilisateur a fermé la console ?

    Peut-être vaudrait-il mieux gérer la validation à un niveau
    supérieur étant donné qu'il peut y avoir X implémentations
    d'Inputer.
  */
  async read(): Promise<string> {
    const { string }: { string: string } = await prompt.get(['string']);

    return string.toUpperCase();
  }
}
