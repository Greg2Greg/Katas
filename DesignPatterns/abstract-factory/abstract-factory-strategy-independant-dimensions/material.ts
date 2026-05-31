export type MaterialKind = 'leather' | 'gold';

export interface Material {
  readonly kind: MaterialKind;
  describeWeight(): string;
  describeResistance(): string;
}

export class LeatherMaterial implements Material {
  kind: MaterialKind = 'leather';
  describeWeight(): string {
    return 'lightweight';
  }

  describeResistance(): string {
    return 'flexible but not very resistant';
  }
}

export class GoldMaterial implements Material {
  kind: MaterialKind = 'gold';
  describeWeight(): string {
    return 'heavy';
  }

  describeResistance(): string {
    return 'solid but expensive';
  }
}
