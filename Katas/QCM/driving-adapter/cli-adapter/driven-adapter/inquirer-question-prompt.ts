import inquirer from 'inquirer';
import { AnswerProposed } from '../../../domain/model/qcm.ts';
import { QuestionPrompt } from '../application/ports/question-prompt.ts';

/*
    Partie de code plus compliqué à tester ici. Il faut tester
    directement via la cli.
*/
export class InquirerQuestionPrompt implements QuestionPrompt {
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

  async nextAnswer(): Promise<AnswerProposed | null> {
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

  async answerQuestion(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
