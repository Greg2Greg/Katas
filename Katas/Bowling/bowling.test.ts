export class BowlingGame {
  private MAX_ROLLS = 21;
  private MAX_PINES = 10;
  private MAX_FRAMES = 10;
  private SPARE_POINTS = 10;
  private STRIKE_POINTS = 10;

  private rolls = new Array<number>(this.MAX_ROLLS);
  private currentRoll = 0;

  roll(pinsKnockedDown: number): void {
    if (pinsKnockedDown > this.MAX_PINES) {
      throw new Error(`Max pins is ${this.MAX_PINES}`);
    }

    this.rolls[this.currentRoll++] = pinsKnockedDown;
  }

  score(): number {
    let score = 0;
    let rollIndex = 0;

    for (let frameIndex = 0; frameIndex < this.MAX_FRAMES; frameIndex++) {
      const frameRollOne = this.rolls[rollIndex];

      if (frameRollOne === this.STRIKE_POINTS) {
        const firstBonusRoll = this.rolls[rollIndex + 1];
        const secondBonusRoll = this.rolls[rollIndex + 2];
        score += this.STRIKE_POINTS + firstBonusRoll + secondBonusRoll;

        rollIndex++;
        continue;
      }

      const frameRollTwo = this.rolls[rollIndex + 1];
      const isSpare = frameRollOne + frameRollTwo === this.SPARE_POINTS;

      if (isSpare) {
        const bonusRoll = this.rolls[rollIndex + 2];
        score += this.SPARE_POINTS + bonusRoll;

        rollIndex = rollIndex + 2;
        continue;
      }

      rollIndex = rollIndex + 2;
      score += frameRollOne + frameRollTwo;
    }

    return score;
  }
}

function rollMany(game: BowlingGame, numberOfRoll: number, pinsToKnock: number): void {
  for (let i = 0; i < numberOfRoll; i++) {
    game.roll(pinsToKnock);
  }
}

describe('Bowling', () => {
  let game: BowlingGame;

  beforeEach(() => {
    game = new BowlingGame();
  });
  it('Should handle scoring with no spare and no strike, all rolls made 0', () => {
    rollMany(game, 20, 0);
    expect(game.score()).toBe(0);
  });
  it('Should handle scoring with no spare and no strike, all rolls made 1', () => {
    rollMany(game, 20, 1);
    expect(game.score()).toBe(20);
  });
  it('Should handle a single spare', () => {
    // Frame 1 : 10 + 3
    game.roll(5);
    game.roll(5);

    // Frame 2 : 3
    game.roll(3);

    rollMany(game, 17, 0);

    expect(game.score()).toBe(16);
  });
  it('Should handle a double spare', () => {
    // Frame 1 : 10 + 3 = 13
    game.roll(5);
    game.roll(5);

    // Frame 2 : 10 + 5 = 15
    game.roll(3);
    game.roll(7);

    // Frame 3 = 5
    game.roll(5);

    rollMany(game, 15, 0);

    expect(game.score()).toBe(33);
  });
  it('Should handle a strike', () => {
    // Frame 1 : 10 + 5 + 3
    game.roll(10);

    // Frame 2 : 8
    game.roll(5);
    game.roll(3);

    rollMany(game, 17, 0);

    expect(game.score()).toBe(26);
  });
  it('Should handle the best score scenario', () => {
    rollMany(game, 12, 10);

    expect(game.score()).toBe(300);
  });
});
