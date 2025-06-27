import { AnsweredQcm } from '../domain/model/qcm.ts';
import { AnswerQcmPresenter } from './port/answer-qcm-presenter.ts';

export class AnswerQcm {
  private readonly answerQcmPresenter: AnswerQcmPresenter;

  constructor(dependencies: { answerQcmPresenter: AnswerQcmPresenter }) {
    this.answerQcmPresenter = dependencies.answerQcmPresenter;
  }

  async execute(input: { answeredQcm: AnsweredQcm[] }) {
    try {
      const { answeredQcm } = input;
      this.answerQcmPresenter.present(answeredQcm);
    } catch (e) {
      this.answerQcmPresenter.presentError();
    }
  }
}
