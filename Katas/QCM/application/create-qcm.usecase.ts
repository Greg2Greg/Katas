import { QcmFactory } from '../domain/entity/qcm/qcm.factory.ts';
import { QuestionDto } from '../domain/value-object/question/question-type.ts';
import { Question } from '../domain/value-object/question/question.value-object.ts';
import { CreateQcmPresenter } from './port/create-qcm.presenter.ts';
import { QcmRepository } from './port/qcm.repository.ts';

export type CreateQcmInput = { questionsDto: QuestionDto[] };

export class CreateQcm {
  private readonly qcmRepository: QcmRepository;
  private readonly createQcmPresenter: CreateQcmPresenter;
  private readonly qcmFactory: QcmFactory;

  constructor(dependencides: {
    qcmRepository: QcmRepository;
    createQcmPresenter: CreateQcmPresenter;
    qcmFactory: QcmFactory;
  }) {
    this.qcmRepository = dependencides.qcmRepository;
    this.createQcmPresenter = dependencides.createQcmPresenter;
    this.qcmFactory = dependencides.qcmFactory;
  }

  /*
    Amélioration possible: laisser au client la possibilité de fournir
    l'id. Cela offre pas mal davantage côté front au niveau UX.
  */
  async execute(input: CreateQcmInput) {
    try {
      const { questionsDto } = input;
      const questions = this.mapToQuestion(questionsDto);

      const qcm = this.qcmFactory.createEmptyQcm();
      qcm.addQuestions(questions);
      qcm.submit();
      const qcmDto = qcm.serialize();

      await this.qcmRepository.save(qcmDto);
      this.createQcmPresenter.present(qcmDto);
    } catch (e) {
      this.createQcmPresenter.presentError(e.message);
    }
  }

  private mapToQuestion(questionsDto: QuestionDto[]): Question[] {
    return questionsDto.reduce((acc: Question[], questionDto) => {
      const question = new Question(questionDto.title, questionDto.answersProposed);
      acc.push(question);
      return acc;
    }, []);
  }
}
