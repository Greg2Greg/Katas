import { Bow, Arrow, Armor } from '../abstract-factory-strategy-independant-dimensions/product-definition.ts';

/*
    Here, we should implement 36 classes for each combination of element and material.
    That's why combination of elements and materials is a problem for the Factory Method pattern.
*/

export class FireLeatherBow implements Bow {
  shoot(): void {
    console.log('🔥 FireLeatherBow shoots a fiery arrow with leather grip!');
  }
}

export class FireLeatherArrow implements Arrow {
  fly(): void {
    console.log('🔥 FireLeatherArrow flies through the air, engulfed in flames!');
  }
}

export class FireLeatherArmor implements Armor {
  protect(): void {
    console.log('🔥 FireLeatherArmor protects with fire-resistant leather!');
  }
}

export class FireGoldBow implements Bow {
  shoot(): void {
    console.log('🔥 FireGoldBow shoots a golden arrow with intense heat!');
  }
}

export class FireGoldArrow implements Arrow {
  fly(): void {
    console.log('🔥 FireGoldArrow flies, leaving a trail of golden light!');
  }
}

export class FireGoldArmor implements Armor {
  protect(): void {
    console.log('🔥 FireGoldArmor protects with golden flames!');
  }
}
