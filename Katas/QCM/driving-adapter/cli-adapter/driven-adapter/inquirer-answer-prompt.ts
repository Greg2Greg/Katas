import inquirer from 'inquirer';
import { QuestionDto } from '../../../domain/value-object/question/question-type.ts';
import { AnswerPromptAdapter } from '../application/ports/answer-prompt.adapter.ts';

export class InquirerAnswerPrompt implements AnswerPromptAdapter {
  async retrieveAnswer(question: QuestionDto): Promise<string[] | null> {
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
