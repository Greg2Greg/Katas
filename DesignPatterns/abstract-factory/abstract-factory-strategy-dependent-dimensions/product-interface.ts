import { BattleContext } from './battle-context.ts';

export interface Bow {
  shoot(context: BattleContext): void;
}

export interface Arrow {
  fly(context: BattleContext): void;
}

export interface Armor {
  protect(context: BattleContext): void;
}
