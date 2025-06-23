/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IFrameObserver, IFrame, IObservableFrame, FrameScore } from './models.ts';

export class TenthFrame implements IFrame, IObservableFrame {
  private observers: IFrameObserver[] = [];
  private rolls = new Array<number>();
  private state: 'NOT_STARTED' | 'WAIT_ON_SECOND_SHOT' | 'WAIT_ON_BONUS_SHOT' | 'COMPLETED' = 'NOT_STARTED';

  addRoll(pinsDown: number): void {
    switch (this.state) {
      case 'NOT_STARTED': {
        this.handleFirstShot(pinsDown);
        break;
      }
      case 'WAIT_ON_SECOND_SHOT': {
        this.handleSecondShot(pinsDown);
        break;
      }
      case 'WAIT_ON_BONUS_SHOT': {
        this.handleBonusShot(pinsDown);
        break;
      }
      case 'COMPLETED': {
        throw new Error('This frame is completed !');
      }
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

  toDto(): FrameScore {
    switch (this.state) {
      case 'NOT_STARTED':
        return { firstRoll: 0, score: this.score() };

      case 'WAIT_ON_SECOND_SHOT':
        return {
          firstRoll: this.rolls[0]!,
          score: this.score(),
        };
      case 'WAIT_ON_BONUS_SHOT':
        return {
          firstRoll: this.rolls[0]!,
          secondRoll: this.rolls[1],
          score: this.score(),
        };
      case 'COMPLETED':
        return {
          firstRoll: this.rolls[0]!,
          secondRoll: this.rolls[1],
          thirdRoll: this.rolls[2],
          score: this.score(),
        };
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

  private score() {
    switch (this.state) {
      case 'NOT_STARTED':
        return 'WAITING_ON_NEXT_ROLLS';
      case 'WAIT_ON_SECOND_SHOT':
        return 'WAITING_ON_NEXT_ROLLS';
      case 'WAIT_ON_BONUS_SHOT':
        return 'WAITING_ON_NEXT_ROLLS';
      case 'COMPLETED':
        return this.rolls[0]! + this.rolls[1]! + this.rolls[2]!;
    }
  }

  private handleFirstShot(pinsDown: number) {
    this.rolls.push(pinsDown);
    this.state = 'WAIT_ON_SECOND_SHOT';
  }

  private handleSecondShot(pinsDown: number) {
    this.rolls.push(pinsDown);
    const score = this.rolls[0]! + this.rolls[1]!;

    if (score >= 10) {
      this.state = 'WAIT_ON_BONUS_SHOT';
      return;
    }

    this.notifyCompleted();
    this.state = 'COMPLETED';
  }

  private handleBonusShot(pinsDown: number) {
    this.rolls.push(pinsDown);
    this.notifyCompleted();
    this.state = 'COMPLETED';
  }
}
