import { BattleContext } from './battle-context.ts';
import { ElementMaterialInteraction } from './interaction-interface.ts';

/*
  Could be in a switch, but its more scalable this by having each class = 1 interaction
*/
export class FireLeatherInteraction implements ElementMaterialInteraction {
  readonly elementKind = 'fire';
  readonly materialKind = 'leather';

  applyToAttack(): string[] {
    return ['Interaction effect: suffering scream deals extra damage to the enemy.'];
  }

  applyToDefense(): string[] {
    return [];
  }
}

export class FireGoldInteraction implements ElementMaterialInteraction {
  readonly elementKind = 'fire';
  readonly materialKind = 'gold';

  applyToAttack(): string[] {
    return ['Interaction effect: molten metal increases damage by 20%.'];
  }

  applyToDefense(): string[] {
    return [];
  }
}

export class WaterLeatherInteraction implements ElementMaterialInteraction {
  readonly elementKind = 'water';
  readonly materialKind = 'leather';

  applyToAttack(): string[] {
    return [];
  }

  applyToDefense(): string[] {
    return ['Interaction effect: incoming fire damage is reduced by 40%.'];
  }
}

export class WaterGoldInteraction implements ElementMaterialInteraction {
  readonly elementKind = 'water';
  readonly materialKind = 'gold';

  applyToAttack(): string[] {
    return [];
  }

  applyToDefense(context: BattleContext): string[] {
    if (!context.isDaylight) {
      return [];
    }

    return ['Interaction effect: daylight reflection deals 20% reflected damage.'];
  }
}
