import { Entity } from '../../../shared/abstraction/entity.ts';
import { Answer } from '../../value-object/answer/answer.value-object.ts';
import { Qcm } from '../qcm/qcm.entity.ts';
import { QcmCannotBeAnsweredIfNotSubmittedError } from './qcm-answer-error.ts';
import { QcmAnswerDto, QcmAnswerProps } from './qcm-answer-type.ts';

export class QcmAnswer extends Entity<QcmAnswerProps, QcmAnswerDto> {
  private constructor(qcmAnswerDto: QcmAnswerProps) {
    super(qcmAnswerDto);

    this.assertQcmIsSubmitted(qcmAnswerDto.qcm);
  }

  static create(qcmAnswerProps: QcmAnswerProps): QcmAnswer {
    return new QcmAnswer(qcmAnswerProps);
  }

  answerQuestions(answers: Answer[]) {
    for (const answer of answers) {
      this.answerQuestion(answer);
    }
  }

  serialize(): QcmAnswerDto {
    return {
      id: this.props.id,
      qcmId: this.props.qcm.serialize().id,
      answers: this.props.answers.map((answer) => answer.serialize()),
    };
  }

  private answerQuestion(answer: Answer) {
    this.props.answers.push(answer);
  }

  private assertQcmIsSubmitted(qcm: Qcm) {
    if (!qcm.isSubmitted()) {
      throw new QcmCannotBeAnsweredIfNotSubmittedError();
    }
  }
}
