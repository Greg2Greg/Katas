import { AnswerDto } from '../../value-object/answer/answer-type.ts';
import { Answer } from '../../value-object/answer/answer.value-object.ts';
import { Qcm } from '../qcm/qcm.entity.ts';

export type QcmAnswerProps = {
  id: string;
  qcm: Qcm;
  answers: Answer[];
};

export type QcmAnswerDto = {
  id: string;
  qcmId: string;
  answers: AnswerDto[];
};
