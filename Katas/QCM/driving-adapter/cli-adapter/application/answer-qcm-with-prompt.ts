import { AnswerQcm } from '../../../application/answer-qcm.ts';
import { QcmRepository } from '../../../application/port/qcm-repository.ts';
import { AnsweredQcm } from '../../../domain/model/qcm.ts';
import { AnswerPrompt } from './ports/answer-prompt.ts';

export class AnswerQcmWithPrompt {
  private readonly qcmRepository: QcmRepository;
  private readonly answerPrompt: AnswerPrompt;
  private readonly answerQcm: AnswerQcm;

  constructor(dependencies: {
    qcmRepository: QcmRepository;
    answerPrompt: AnswerPrompt;
    answerQcm: AnswerQcm;
  }) {
    this.qcmRepository = dependencies.qcmRepository;
    this.answerPrompt = dependencies.answerPrompt;
    this.answerQcm = dependencies.answerQcm;
  }

  async execute(input: { qcmId: string }): Promise<void> {
    const { qcmId } = input;

    const qcm = await this.qcmRepository.findById(qcmId);

    if (!qcm) {
      throw new Error('This QCM doesnt exist');
    }

    const answeredQcm = new Array<AnsweredQcm>();
    for await (const question of qcm.questions) {
      const answerRetrieved = await this.answerPrompt.retrieveAnswer(question);

      if (!answerRetrieved) {
        throw new Error('No answer retrieved');
      }

      answeredQcm.push({ question: question, givenAnswers: answerRetrieved });
    }

    await this.answerQcm.execute({ answeredQcm });
  }
}
