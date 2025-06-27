import { AnsweredQcm } from '../../domain/model/qcm.ts';

export interface AnswerQcmPresenter {
  present(answerQcm: AnsweredQcm[]): void;
  presentError(): void;
}
