import { QcmDoesNotExistError, QuestionDoesNotExist } from '../domain/entity/qcm-answer/qcm-answer-error.ts';
import { QcmAnswerFactory } from '../domain/entity/qcm-answer/qcm-answer.factory.ts';
import { Qcm } from '../domain/entity/qcm/qcm.entity.ts';
import { Answer } from '../domain/value-object/answer/answer.value-object.ts';
import { Question } from '../domain/value-object/question/question.value-object.ts';
import { AnswerQcmPresenter } from './port/answer-qcm.presenter.ts';
import { QcmRepository } from './port/qcm.repository.ts';

export type AnswerQcmInput = { answersDto: { questionTitle: string; answers: string[] }[]; qcmId: string };

export class AnswerQcm {
  private readonly answerQcmPresenter: AnswerQcmPresenter;
  private readonly qcmAnswerFactory: QcmAnswerFactory;
  private readonly qcmRepository: QcmRepository;

  constructor(dependencies: {
    answerQcmPresenter: AnswerQcmPresenter;
    qcmAnswerFactory: QcmAnswerFactory;
    qcmRepository: QcmRepository;
  }) {
    this.answerQcmPresenter = dependencies.answerQcmPresenter;
    this.qcmAnswerFactory = dependencies.qcmAnswerFactory;
    this.qcmRepository = dependencies.qcmRepository;
  }

  async execute(input: AnswerQcmInput) {
    try {
      const { answersDto, qcmId } = input;
      const qcm = await this.findQcmById(qcmId);
      const answers = this.mapToAnswer(answersDto, qcm);

      const qcmAnswer = this.qcmAnswerFactory.createEmptyQcmAnswer(qcm);
      qcmAnswer.answerQuestions(answers);
      const qcmAnswerDto = qcmAnswer.serialize();

      this.answerQcmPresenter.present(qcmAnswerDto);
    } catch (e) {
      this.answerQcmPresenter.presentError(e.message);
    }
  }

  private mapToAnswer(answersDto: { questionTitle: string; answers: string[] }[], qcm: Qcm): Answer[] {
    return answersDto.reduce((acc: Answer[], answerDto) => {
      const question = this.findQuestionByTitle(qcm, answerDto.questionTitle);
      const answer = new Answer(question, answerDto.answers);
      acc.push(answer);
      return acc;
    }, []);
  }

  private async findQcmById(qcmId: string): Promise<Qcm> {
    const qcm = await this.qcmRepository.findById(qcmId);

    if (!qcm) {
      throw new QcmDoesNotExistError();
    }

    return qcm;
  }

  private findQuestionByTitle(qcm: Qcm, questionTitle: string): Question {
    const question = qcm.findQuestionByTitle(questionTitle);

    if (!question) {
      throw new QuestionDoesNotExist();
    }

    return question;
  }
}
