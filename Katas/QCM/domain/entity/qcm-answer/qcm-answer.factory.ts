import { UuidProvider } from '../../../shared/abstraction/uuid-provider.ts';
import { Qcm } from '../qcm/qcm.entity.ts';
import { QcmAnswerProps } from './qcm-answer-type.ts';
import { QcmAnswer } from './qcm-answer.entity.ts';

export class QcmAnswerFactory {
  constructor(private readonly uuidProvider: UuidProvider) {}

  createEmptyQcmAnswer(qcm: Qcm): QcmAnswer {
    return QcmAnswer.create(this.defaultProps(qcm));
  }

  /*
  fromExisting(props: QcmAnswerProps): QcmAnswer {
    return QcmAnswer.create(props);
  }

  withCustomProps(input: { qcm: Qcm; customProps: Partial<QcmAnswerProps> }): QcmAnswer {
    const { customProps, qcm } = input;
    const props = { ...this.defaultProps(qcm), ...customProps };

    return QcmAnswer.create(props);
  }*/

  defaultProps(qcm: Qcm): QcmAnswerProps {
    return {
      id: this.uuidProvider.generate(),
      answers: [],
      qcm,
    };
  }
}
