export type ElementKind = 'fire' | 'water';

export interface ElementEffect {
  readonly kind: ElementKind;
  applyToAttack(action: string): string;
  applyToDefense(action: string): string;
}

export class FireElement implements ElementEffect {
  kind: ElementKind = 'fire';
  applyToAttack(action: string): string {
    return `${action} with burning fire damage`;
  }

  applyToDefense(action: string): string {
    return `${action} with heat resistance`;
  }
}

export class WaterElement implements ElementEffect {
  kind: ElementKind = 'water';
  applyToAttack(action: string): string {
    return `${action} with water impact`;
  }

  applyToDefense(action: string): string {
    return `${action} with fluid protection`;
  }
}
