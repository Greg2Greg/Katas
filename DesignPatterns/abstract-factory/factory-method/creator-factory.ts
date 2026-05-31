/*
    Here, we should implement 12 factories to cover all combinations.
 */

import { Bow, Arrow, Armor } from '../abstract-factory-strategy-independant-dimensions/product-definition.ts';
import { MedievalEquipment } from './creator-abstract-class.ts';
import {
  FireLeatherBow,
  FireLeatherArrow,
  FireLeatherArmor,
  FireGoldBow,
  FireGoldArrow,
  FireGoldArmor,
} from './product-implementation.ts';

export class FireLeatherMedievalEquipment extends MedievalEquipment {
  protected createBow(): Bow {
    return new FireLeatherBow();
  }

  protected createArrow(): Arrow {
    return new FireLeatherArrow();
  }

  protected createArmor(): Armor {
    return new FireLeatherArmor();
  }
}

export class FireGoldMedievalEquipment extends MedievalEquipment {
  protected createBow(): Bow {
    return new FireGoldBow();
  }

  protected createArrow(): Arrow {
    return new FireGoldArrow();
  }

  protected createArmor(): Armor {
    return new FireGoldArmor();
  }
}
