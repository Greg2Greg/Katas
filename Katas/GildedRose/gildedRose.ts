import { Item } from './item/item.ts';

/*
  Voir comment gérer le cas des alterations d'un objet
  dans les cas suivants :

  1. Cas de l'alteration dont l'effet est identique pour 
     tous les objets

  2. Cas de l'alteration dont l'effet varie selon les objets

  3. Cas de l'alteration qui ne s'applique pas à tous les objets

  4. Cas de l'alteration qui s'applique obligatoirement sur tous
     les objets
*/

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      item.updateItem();
    });

    return this.items;
  }
}
