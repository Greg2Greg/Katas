import { AnswerQcmPresenter } from '../../../application/port/answer-qcm.presenter.ts';
import { QcmAnswerDto } from '../../../domain/entity/qcm-answer/qcm-answer-type.ts';

export class FakeAnswerQcmPresenter implements AnswerQcmPresenter {
  message: QcmAnswerDto | string | undefined = undefined;

  present(qcmAnswerDto: QcmAnswerDto): void {
    this.message = qcmAnswerDto;
  }

  presentError(message: string): void {
    this.message = message;
  }
}
