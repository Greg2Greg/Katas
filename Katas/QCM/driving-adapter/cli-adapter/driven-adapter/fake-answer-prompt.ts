import { AnswerPrompt } from '../application/ports/answer-prompt.ts';

export class FakeAnswerPrompt implements AnswerPrompt {
  constructor(private readonly answers: string[]) {}

  async retrieveAnswer(): Promise<string[] | null> {
    const answers = this.answers.shift();

    if (!answers) {
      return null;
    }

    const answersAsArray = answers.split(' ');
    return answersAsArray;
  }
}
