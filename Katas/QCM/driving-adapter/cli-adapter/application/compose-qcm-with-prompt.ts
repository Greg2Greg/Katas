/* eslint-disable no-constant-condition */
import { CreateQcmInput } from '../../../application/create-qcm.usecase.ts';
import { QuestionDto } from '../../../domain/value-object/question/question-type.ts';
import { validateCreateQcmInput } from '../../../shared/schema/create-qcm.validator.ts';
import { QuestionPromptAdapter } from './ports/question-prompt.adapter.ts';

export class ComposeQcmWithPrompt {
  private readonly questionPromptAdapter: QuestionPromptAdapter;

  constructor(dependencies: { questionPromptAdapter: QuestionPromptAdapter }) {
    this.questionPromptAdapter = dependencies.questionPromptAdapter;
  }

  async execute(): Promise<CreateQcmInput> {
    const unsafeQuestions = await this.retrieveQuestions();
    const questionsDto = validateCreateQcmInput(unsafeQuestions);
    return { questionsDto };
  }

  private async retrieveQuestions(): Promise<QuestionDto[]> {
    const questions = new Array<QuestionDto>();
    while (true) {
      const questionTitle = await this.questionPromptAdapter.nextQuestion();
      if (!questionTitle) {
        break;
      }

      const answersProposed: { title: string; isCorrect: boolean }[] = [];
      while (true) {
        const answer = await this.questionPromptAdapter.nextAnswerProposed();
        if (!answer) {
          break;
        }

        answersProposed.push(answer);
      }
      questions.push({ title: questionTitle, answersProposed });
    }

    return questions;
  }
}
