/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IFrame, IObservableFrame, IFrameObserver, FrameScore, IBonusFrame } from './models.ts';

export class ClassicFrame implements IFrame, IObservableFrame, IBonusFrame {
  private observers: IFrameObserver[] = [];
  private rolls = new Array<number>();
  private state: 'NOT_STARTED' | 'NOT_FINISHED' | 'CLASSIC' | 'SPARE' | 'STRIKE' = 'NOT_STARTED';
  private bonusRolls = new Array<number>();
  private bonusRollsNeeded = 0;
  private bonusReceived = 0;

  addRoll(pinsDown: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10) {
    switch (this.state) {
      case 'NOT_STARTED': {
        this.handleNotStarted(pinsDown);
        break;
      }
      case 'NOT_FINISHED': {
        this.handleNotFinished(pinsDown);
        break;
      }
      case 'CLASSIC':
      case 'SPARE':
      case 'STRIKE': {
        throw new Error('This frame is completed !');
      }
    }
  }

  toDto(): FrameScore {
    switch (this.state) {
      case 'NOT_STARTED':
        return { firstRoll: 0, score: this.score() };
      case 'NOT_FINISHED':
        return {
          firstRoll: this.rolls[0]!,
          score: this.score(),
        };
      case 'CLASSIC':
        return {
          firstRoll: this.rolls[0]!,
          secondRoll: this.rolls[1],
          score: this.score(),
        };
      case 'SPARE':
        return {
          firstRoll: this.rolls[0]!,
          secondRoll: this.rolls[1],
          score: this.score(),
        };
      case 'STRIKE':
        return {
          firstRoll: 10,
          score: this.score(),
        };
    }
  }

  addBonus(pinsDown: number) {
    this.bonusReceived++;
    this.bonusRolls.push(pinsDown);

    if (this.bonusReceived === this.bonusRollsNeeded) {
      this.notifyBonusCompleted();
    }
  }

  attach(observer: IFrameObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: IFrameObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  private score() {
    switch (this.state) {
      case 'NOT_STARTED':
        return 'NOT_STARTED';
      case 'NOT_FINISHED':
        return 'WAITING_ON_NEXT_ROLLS';
      case 'CLASSIC':
        return this.rolls[0]! + this.rolls[1]!;
      case 'SPARE':
        return Number.isInteger(this.bonusRolls[0])
          ? this.rolls[0]! + this.rolls[1]! + this.bonusRolls[0]!
          : 'WAITING_ON_NEXT_ROLLS';
      case 'STRIKE':
        return Number.isInteger(this.bonusRolls[0]) && Number.isInteger(this.bonusRolls[1])
          ? this.rolls[0]! + this.bonusRolls[0]! + this.bonusRolls[1]!
          : 'WAITING_ON_NEXT_ROLLS';
    }
  }

  private handleNotStarted(pinsDown: number) {
    this.rolls.push(pinsDown);

    if (this.isStrike(pinsDown)) {
      this.state = 'STRIKE';
      this.bonusRollsNeeded = 2;
      this.notifyCompleted();
      this.notifyBonusNeeded();
      return;
    }

    this.state = 'NOT_FINISHED';
  }

  private handleNotFinished(pinsDown: number) {
    this.rolls.push(pinsDown);

    if (this.isSpare({ currentRoll: pinsDown, previousRoll: this.rolls[0]! })) {
      this.state = 'SPARE';
      this.bonusRollsNeeded = 1;
      this.notifyCompleted();
      this.notifyBonusNeeded();
      return;
    }

    this.notifyCompleted();
    this.state = 'CLASSIC';
  }

  private notifyBonusNeeded() {
    for (const observer of this.observers) {
      observer.onFrameNotification({
        type: 'BONUS_NEEDED',
        frame: this,
      });
    }
  }

  private notifyBonusCompleted() {
    for (const observer of this.observers) {
      observer.onFrameNotification({
        type: 'BONUS_COMPLETED',
        frame: this,
      });
    }
  }

  private notifyCompleted() {
    for (const observer of this.observers) {
      observer.onFrameNotification({
        type: 'COMPLETED',
        frame: this,
      });
    }
  }

  private isSpare(rolls: { currentRoll: number; previousRoll: number }) {
    const { currentRoll, previousRoll } = rolls;
    if (currentRoll + previousRoll === 10) {
      return true;
    }

    return false;
  }

  private isStrike(roll: number) {
    if (roll === 10) {
      return true;
    }

    return false;
  }
}
