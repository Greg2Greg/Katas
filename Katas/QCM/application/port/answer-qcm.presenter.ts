import { QcmAnswerDto } from '../../domain/entity/qcm-answer/qcm-answer-type.ts';

export interface AnswerQcmPresenter {
  present(qcmAnswerDto: QcmAnswerDto): void;
  presentError(message: string): void;
}
