export interface Inputer {
  read(): Promise<number | 'NOT_A_VALID_NUMBER' | null>;
}

export interface Outputer {
  log(value: OutputValues): void;
}

export interface RandomNumberGenerator {
  generate(): number;
}

export type GuessState = 'TOO_LOW' | 'TOO_HIGH' | 'CORRECT';
export type GameState = 'IN_PROGRESS' | 'RESOLVED' | 'TOO_MANY_ATTEMPTS' | 'NOT_A_VALID_NUMBER';
export type GuessResult = 'TOO_LOW' | 'TOO_HIGH' | 'CORRECT';
export type OutputValues = GameState | GuessState;
