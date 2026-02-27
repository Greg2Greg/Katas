import { UuidProvider } from '../../../shared/abstraction/uuid-provider.ts';
import { Question } from '../../value-object/question/question.value-object.ts';
import { QcmDto, QcmProps } from './qcm-type.ts';
import { Qcm } from './qcm.entity.ts';

export class QcmFactory {
  constructor(private readonly uuidProvider: UuidProvider) {}

  createEmptyQcm(): Qcm {
    const defaultProps: QcmProps = {
      id: this.uuidProvider.generate(),
      isSubmitted: false,
      questions: [],
    };

    return Qcm.create(defaultProps);
  }

  /* Other potentiel methods:
  fromExisting(qcmProps: QcmProps): Qcm {
    return Qcm.create(qcmProps);
  }

  withCustomProps(customProps: Partial<QcmProps>): Qcm {
    const defaultProps: QcmProps = {
      id: this.uuidProvider.generate(),
      isSubmitted: false,
      questions: [],
    };

    const props = { ...defaultProps, ...customProps };

    return Qcm.create(props);
  }
  */

  fromDto(qcmDto: QcmDto): Qcm {
    const questions = qcmDto.questions.map(
      (questionDto) => new Question(questionDto.title, questionDto.answersProposed)
    );

    return Qcm.create({ id: qcmDto.id, isSubmitted: qcmDto.isSubmitted, questions });
  }
}
