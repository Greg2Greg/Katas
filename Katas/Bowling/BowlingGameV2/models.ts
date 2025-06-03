/*
  Discriminated unions qui permettent d'inférer le type de frame
  dans le handler

  La manière suivante ne permet pas l'inférence des types:
  {type: 'COMPLETED' | 'BONUS_NEEDED'; frame: IFrame | IFrame&IBonusFrame }
*/
export type IFrameEvents =
  | {
      type: 'COMPLETED';
      frame: IFrame;
    }
  | {
      type: 'BONUS_NEEDED' | 'BONUS_COMPLETED';
      frame: IFrame & IBonusFrame;
    };

export interface IFrameObserver {
  onFrameNotification(event: IFrameEvents): void;
}

export interface IObservableFrame {
  attach(observer: IFrameObserver): void;
  detach(observer: IFrameObserver): void;
}

export interface IFrameObservable extends IObservableFrame, IFrame {}

export interface IFrame {
  addRoll(pinsDown: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): void;
  toDto(): FrameScore;
}

export interface IBonusFrame extends IFrame {
  addBonus(pinsDown: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): void;
}

export type FrameScore = {
  firstRoll: number;
  secondRoll?: number | 'WAITING_ON_NEXT_ROLLS';
  thirdRoll?: number | 'WAITING_ON_NEXT_ROLLS';
  score: number | 'WAITING_ON_NEXT_ROLLS' | 'NOT_STARTED';
};

export interface IBowlingGame {
  roll(pinsDown: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10): void;
  getCurrentScore(): FrameScore[];
}
