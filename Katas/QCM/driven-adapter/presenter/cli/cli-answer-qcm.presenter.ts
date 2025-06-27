import { AnswerQcmPresenter } from '../../../application/port/answer-qcm-presenter.ts';
import { AnsweredQcm } from '../../../domain/model/qcm.ts';

export class CliAnswerQcmPresenter implements AnswerQcmPresenter {
  present(answeedrQcm: AnsweredQcm[]): void {
    console.log(`QCM answered: ${answeedrQcm}`);
  }

  presentError(): void {
    console.log('Error: qcm could not be answered');
  }
}
