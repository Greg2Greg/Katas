import { AnswerQcmInput } from '../../../application/answer-qcm.usecase.ts';
import { QcmRepository } from '../../../application/port/qcm.repository.ts';
import { Qcm } from '../../../domain/entity/qcm/qcm.entity.ts';
import { validateAnswerQcmInput } from '../../../shared/schema/answer-qcm.validator.ts';
import { AnswerPromptAdapter } from './ports/answer-prompt.adapter.ts';

export class AnswerQcmWithPrompt {
  private readonly qcmRepository: QcmRepository;
  private readonly answerPromptAdapter: AnswerPromptAdapter;

  constructor(dependencies: { qcmRepository: QcmRepository; answerPromptAdapter: AnswerPromptAdapter }) {
    this.qcmRepository = dependencies.qcmRepository;
    this.answerPromptAdapter = dependencies.answerPromptAdapter;
  }

  async execute(input: { qcmId: string }): Promise<AnswerQcmInput> {
    const { qcmId } = input;

    const qcm = await this.findQcmById(qcmId);
    const unsafeAnswers = await this.retrieveAnswers(qcm);
    const answers = validateAnswerQcmInput({ answers: unsafeAnswers, qcmId });
    return { answersDto: answers.answers, qcmId: answers.qcmId };
  }

  private async retrieveAnswers(qcm: Qcm) {
    const answersDto = new Array<{ questionTitle: string; answers: string[] }>();
    const questions = qcm.serialize().questions;
    for await (const question of questions) {
      const { answersProposed, title } = question;
      const answerRetrieved = await this.answerPromptAdapter.retrieveAnswer({
        answersProposed,
        title,
      });

      if (!answerRetrieved) {
        throw new Error('No answer retrieved');
      }

      answersDto.push({ questionTitle: title, answers: answerRetrieved });
    }
    return answersDto;
  }

  /*
    Je ne pense pas que les principes clean archi m'autorise à
    utiliser le qcmRepository ici. Je pense qu' il faudrait un 
    endpoint GET qcm/:id. En plus ça me permettrait de récupérer
    un qcmDto
  */
  private async findQcmById(qcmId: string): Promise<Qcm> {
    const qcm = await this.qcmRepository.findById(qcmId);

    if (!qcm) {
      throw new Error('This QCM doesnt exist');
    }

    return qcm;
  }
}
