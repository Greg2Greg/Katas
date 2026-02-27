import { expect } from 'vitest';
import { QcmAnswerFactory } from '../../../../domain/entity/qcm-answer/qcm-answer.factory.ts';
import { QcmFactory } from '../../../../domain/entity/qcm/qcm.factory.ts';
import { QcmDto } from '../../../../domain/entity/qcm/qcm-type.ts';
import { QuestionDto } from '../../../../domain/value-object/question/question-type.ts';
import { Question } from '../../../../domain/value-object/question/question.value-object.ts';
import { FakeAnswerQcmPresenter } from '../../../../driven-adapter/presenter/fake/fake-answer-qcm.presenter.ts';
import { FakeCreateQcmPresenter } from '../../../../driven-adapter/presenter/fake/fake-create-qcm.presenter.ts';
import { FakeQcmRepository } from '../../../../driven-adapter/repository/fake-qcm.repository.ts';
import { StubUuidProvider } from '../../../../shared/provider/uuid/stub-uuid.provider.ts';
import { AnswerQcm, AnswerQcmInput } from '../../../answer-qcm.usecase.ts';
import { CreateQcm, CreateQcmInput } from '../../../create-qcm.usecase.ts';

export type QcmFixture = ReturnType<typeof createQcmFixture>;

export const createQcmFixture = () => {
  const fakeCreateQcmPresenter = new FakeCreateQcmPresenter();
  const fakeAnswerQcmPresenter = new FakeAnswerQcmPresenter();
  const qcmIdProvider = new StubUuidProvider();
  const qcmFactory = new QcmFactory(qcmIdProvider);
  const qcmAnswerFactory = new QcmAnswerFactory(qcmIdProvider);
  const fakeQcmRepository = new FakeQcmRepository(qcmFactory);
  const createQcm = new CreateQcm({
    createQcmPresenter: fakeCreateQcmPresenter,
    qcmFactory,
    qcmRepository: fakeQcmRepository,
  });
  const answerQcm = new AnswerQcm({
    answerQcmPresenter: fakeAnswerQcmPresenter,
    qcmAnswerFactory,
    qcmRepository: fakeQcmRepository,
  });
  let thrownError: Error;

  return {
    async givenQcm(qcmDto: QcmDto) {
      await fakeQcmRepository.save(qcmDto);
    },

    async whenCreateQcm(createQcmInput: CreateQcmInput) {
      await createQcm.execute(createQcmInput);
    },

    async whenAnswerQcm(answerQcmInput: AnswerQcmInput) {
      await answerQcm.execute(answerQcmInput);
    },

    async whenSubmit(qcmId: string) {
      try {
        const qcm = await fakeQcmRepository.findById(qcmId);
        qcm?.submit();
      } catch (e) {
        thrownError = e;
      }
    },

    async whenAddQuestion(questionDto: QuestionDto, qcmId: string) {
      try {
        const qcm = await fakeQcmRepository.findById(qcmId);
        const question = new Question(questionDto.title, questionDto.answersProposed);
        qcm?.addQuestions([question]);
      } catch (e) {
        thrownError = e;
      }
    },

    async thenQcmShouldBePersistedWith(expectedQcmDto: QcmDto) {
      const qcm = await fakeQcmRepository.findById(qcmIdProvider.id);
      expect(qcm?.serialize()).toEqual(expectedQcmDto);
    },

    thenQcmShouldBePresentedWith(expectedPresentation: unknown) {
      expect(fakeCreateQcmPresenter.message).toEqual(expectedPresentation);
    },

    thenQcmAnswerShouldBePresentedWith(expectedPresentation: unknown) {
      expect(fakeAnswerQcmPresenter.message).toEqual(expectedPresentation);
    },

    async thenQcmShouldBeSubmitted() {
      const qcm = await fakeQcmRepository.findById(qcmIdProvider.id);

      expect(qcm?.serialize().isSubmitted).toBe(true);
    },

    thenShouldThrow(error: new () => Error) {
      expect(thrownError).toBeInstanceOf(error);
    },
  };
};
