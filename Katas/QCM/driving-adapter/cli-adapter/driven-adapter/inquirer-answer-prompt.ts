import inquirer from 'inquirer';
import { AnswerPrompt } from '../application/ports/answer-prompt.ts';
import { Question } from '../../../domain/model/qcm.ts';

export class InquirerAnswerPrompt implements AnswerPrompt {
  async retrieveAnswer(question: Question): Promise<string[] | null> {
    const answersProposed = question.answersProposed.map((answerProposed) => answerProposed.title);

    const { answer }: { answer: string[] } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'answer',
        message: question.title,
        choices: answersProposed,
      },
    ]);

    return answer;
  }
}
