import { HangmanGuesser } from './hangmanGuesser.ts';

describe('HangmanGuesser', () => {
  it('should show a letter', async () => {
    const hangmanGuesser = new HangmanGuesser('A');
    const currentHangmanProgress = hangmanGuesser.currentProgress;
    expect(currentHangmanProgress).toBe('_');
  });

  it('should show a word', async () => {
    const hangmanGuesser = new HangmanGuesser('HALLO');
    const currentHangmanProgress = hangmanGuesser.currentProgress;
    expect(currentHangmanProgress).toBe('_____');
  });

  it('should guess a letter', async () => {
    const hangmanGuesser = new HangmanGuesser('A');
    hangmanGuesser.guess('A');

    const currentHangmanProgress = hangmanGuesser.currentProgress;
    expect(currentHangmanProgress).toBe('A');
  });

  it('should reveal a single letter in a word', async () => {
    const hangmanGuesser = new HangmanGuesser('HALLO');
    hangmanGuesser.guess('A');

    const currentHangmanProgress = hangmanGuesser.currentProgress;
    expect(currentHangmanProgress).toBe('_A___');
  });
  it('should reveal a two letters in a word if duplicate', async () => {
    const hangmanGuesser = new HangmanGuesser('HALLA');
    hangmanGuesser.guess('A');

    const currentHangmanProgress = hangmanGuesser.currentProgress;
    expect(currentHangmanProgress).toBe('_A__A');
  });
  it('should reveal the whole word if everything is discovered', async () => {
    const hangmanGuesser = new HangmanGuesser('HALLA');
    hangmanGuesser.guess('H');
    hangmanGuesser.guess('A');
    hangmanGuesser.guess('L');

    const currentHangmanProgress = hangmanGuesser.currentProgress;
    expect(currentHangmanProgress).toBe('HALLA');
  });

  it('should reveal nothing if wrong letter typed', async () => {
    const hangmanGuesser = new HangmanGuesser('HALLO');
    hangmanGuesser.guess('X');
    const currentHangmanProgress = hangmanGuesser.currentProgress;
    expect(currentHangmanProgress).toBe('_____');
  });
});
