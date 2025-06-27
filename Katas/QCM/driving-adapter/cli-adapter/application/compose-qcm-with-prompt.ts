/* eslint-disable no-constant-condition */

import { CreateQcm } from '../../../application/create-qcm.ts';
import { UuidProvider } from '../../../shared/provider/uuid/uuid-provider.ts';
import { Question, Qcm, AnswerProposed } from '../../../domain/model/qcm.ts';
import { QuestionPrompt } from './ports/question-prompt.ts';

export class ComposeQcmWithPrompt {
  private readonly questionPrompt: QuestionPrompt;
  private readonly uuidProvider: UuidProvider;
  private readonly createQcm: CreateQcm;
  private readonly _questions = new Array<Question>();

  constructor(dependencies: {
    questionPrompt: QuestionPrompt;
    uuidProvider: UuidProvider;
    createQcm: CreateQcm;
  }) {
    this.questionPrompt = dependencies.questionPrompt;
    this.uuidProvider = dependencies.uuidProvider;
    this.createQcm = dependencies.createQcm;
  }

  async execute() {
    while (true) {
      const questionTitle = await this.questionPrompt.nextQuestion();
      if (!questionTitle) {
        break;
      }

      const answersProposed: AnswerProposed[] = [];
      while (true) {
        const answer = await this.questionPrompt.nextAnswer();
        if (!answer) {
          break;
        }

        answersProposed.push(answer);
      }
      this._questions.push({ title: questionTitle, answersProposed });
    }

    const id = this.uuidProvider.generate();
    const qcm: Qcm = { id, questions: this._questions };
    await this.createQcm.execute({ qcm });
  }
}
