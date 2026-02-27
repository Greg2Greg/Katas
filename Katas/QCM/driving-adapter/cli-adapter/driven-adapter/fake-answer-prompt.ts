import { AnswerPromptAdapter } from '../application/ports/answer-prompt.adapter.ts';

export class FakeAnswerPrompt implements AnswerPromptAdapter {
  answers: string[];

  async retrieveAnswer(): Promise<string[] | null> {
    const answers = this.answers.shift();

    if (!answers) {
      return null;
    }

    const answersAsArray = answers.split(';');
    return answersAsArray;
  }
}
