import prompt from 'prompt';
import { Inputer } from '../../models/models.ts';

const ValidNumberRegex = /^(?:[1-9]?[0-9])$/;
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
  async read(): Promise<number | 'NOT_A_VALID_NUMBER'> {
    try {
      const { number } = await prompt.get(['number']);

      if (!ValidNumberRegex.test(number as string)) {
        return 'NOT_A_VALID_NUMBER';
      }

      return parseInt(number as string, 10);
    } catch (e) {
      return 'NOT_A_VALID_NUMBER';
    }
  }
}
