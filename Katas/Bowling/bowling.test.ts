import { BowlingGameV2 } from './BowlingGameV2/bowlingGameV2.ts';

function rollMany(
  game: BowlingGameV2,
  pinsDown: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 0,
  count: number
) {
  for (let i = 0; i < count; i++) {
    game.roll(pinsDown);
  }
}

describe('Bowling', () => {
  let bowlingGame: BowlingGameV2;

  beforeEach(() => {
    bowlingGame = new BowlingGameV2();
  });
  it('Game hasnt started', () => {
    expect(bowlingGame.getCurrentScore()).toEqual([]);
  });
  it('First roll without strike', () => {
    bowlingGame.roll(4);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 4,
        score: 'WAITING_ON_NEXT_ROLLS',
      },
    ]);
  });
  it('First 2 classic rolls', () => {
    bowlingGame.roll(4);
    bowlingGame.roll(4);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 4,
        secondRoll: 4,
        score: 8,
      },
    ]);
  });
  it('First 2 rolls with spare', () => {
    bowlingGame.roll(5);
    bowlingGame.roll(5);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 5,
        secondRoll: 5,
        score: 'WAITING_ON_NEXT_ROLLS',
      },
    ]);
  });
  it('First 2 rolls with spare and anoter classic roll', () => {
    bowlingGame.roll(5);
    bowlingGame.roll(5);
    bowlingGame.roll(4);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 5,
        secondRoll: 5,
        score: 14,
      },
      {
        firstRoll: 4,
        score: 'WAITING_ON_NEXT_ROLLS',
      },
    ]);
  });
  it('First roll strike', () => {
    bowlingGame.roll(10);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 10,
        score: 'WAITING_ON_NEXT_ROLLS',
      },
    ]);
  });
  it('First 3 rolls strike', () => {
    bowlingGame.roll(10);
    bowlingGame.roll(10);
    bowlingGame.roll(10);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 'WAITING_ON_NEXT_ROLLS',
      },
      {
        firstRoll: 10,
        score: 'WAITING_ON_NEXT_ROLLS',
      },
    ]);
  });
  it('Should be able to roll one more time on last frame if spare', () => {
    rollMany(bowlingGame, 0, 18);
    bowlingGame.roll(5);
    bowlingGame.roll(5);
    bowlingGame.roll(5);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 0,
        secondRoll: 0,
        score: 0,
      },
      {
        firstRoll: 5,
        secondRoll: 5,
        thirdRoll: 5,
        score: 15,
      },
    ]);
  });
  it('Should not be able to roll the bonus if no spare nor strike', () => {
    rollMany(bowlingGame, 0, 18);
    bowlingGame.roll(5);
    bowlingGame.roll(4);

    expect(() => bowlingGame.roll(5)).toThrow('Game is completed');
  });
  it('Should throw if trying to roll one more time after 10th frame bonus', () => {
    rollMany(bowlingGame, 0, 18);
    bowlingGame.roll(5);
    bowlingGame.roll(5);
    bowlingGame.roll(5);

    expect(() => bowlingGame.roll(5)).toThrow('Game is completed');
  });

  it('Should be able to do the perfect scenario', () => {
    rollMany(bowlingGame, 10, 12);

    expect(bowlingGame.getCurrentScore()).toEqual([
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        score: 30,
      },
      {
        firstRoll: 10,
        secondRoll: 10,
        thirdRoll: 10,
        score: 30,
      },
    ]);
  });
});
