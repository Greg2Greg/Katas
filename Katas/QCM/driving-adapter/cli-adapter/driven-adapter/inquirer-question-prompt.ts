import inquirer from 'inquirer';
import { QuestionPromptAdapter } from '../application/ports/question-prompt.adapter.ts';
import { AnswerProposedDto } from '../../../domain/value-object/question/question-type.ts';

/*
    Partie de code plus compliqué à tester ici. Il faut tester
    directement via la cli.
*/
export class InquirerQuestionPrompt implements QuestionPromptAdapter {
  async nextQuestion(): Promise<string | null> {
    const { question }: { question: string } = await inquirer.prompt([
      {
        type: 'input',
        name: 'question',
        message: 'Enter a question:',
      },
    ]);

    if (question == null || question == '') {
      return null;
    }

    return question as string;
  }

  async nextAnswerProposed(): Promise<AnswerProposedDto | null> {
    const { answer }: { answer: string } = await inquirer.prompt([
      {
        type: 'input',
        name: 'answer',
        message: 'Enter an answer:',
      },
    ]);

    if (answer == null || answer == '') {
      return null;
    }

    const { isCorrect }: { isCorrect: boolean } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isCorrect',
        message: 'Is this answer correct?',
        default: false,
      },
    ]);

    return { title: answer as string, isCorrect: !!isCorrect };
  }
}
