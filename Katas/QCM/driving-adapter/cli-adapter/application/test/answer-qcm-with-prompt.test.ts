import { beforeEach, describe, expect, test } from 'vitest';
import { AnswerQcmWithPrompt } from '../answer-qcm-with-prompt.ts';
import { FakeAnswerPrompt } from '../../driven-adapter/fake-answer-prompt.ts';
import { FakeQcmRepository } from '../../../../driven-adapter/repository/fake-qcm.repository.ts';
import { QcmFactory } from '../../../../domain/entity/qcm/qcm.factory.ts';
import { StubUuidProvider } from '../../../../shared/provider/uuid/stub-uuid.provider.ts';
import { qcmDtoBuilder } from '../../../../application/test/helper/builder/qcm-dto.builder.ts';
import { questionDtoBuilder } from '../../../../application/test/helper/builder/question-dto.builder.ts';

describe('Feature: answer a QCM with prompt', () => {
  let answerQcmWithPrompt: AnswerQcmWithPrompt;
  let fakeQcmRepository: FakeQcmRepository;
  let fakeAnswerPrompt: FakeAnswerPrompt;

  beforeEach(() => {
    fakeAnswerPrompt = new FakeAnswerPrompt();
    const uuidProvider = new StubUuidProvider('');
    const qcmFactory = new QcmFactory(uuidProvider);
    fakeQcmRepository = new FakeQcmRepository(qcmFactory);
    answerQcmWithPrompt = new AnswerQcmWithPrompt({
      answerPrompt: fakeAnswerPrompt,
      qcmRepository: fakeQcmRepository,
    });
  });

  test('should retrieve an answer of a question', async () => {
    const questionDto = questionDtoBuilder()
      .withTitle('Quelle est la capitale de Paris ?')
      .withAnswersProposed([
        { isCorrect: true, title: 'Paris' },
        { isCorrect: true, title: 'Berlin' },
      ])
      .build();
    const qcm = qcmDtoBuilder().withIsSubmitted(true).withQuestions([questionDto]).build();
    await fakeQcmRepository.save(qcm);
    fakeAnswerPrompt.answers = ['Berlin'];

    const answers = await answerQcmWithPrompt.execute({ qcmId: '' });

    expect(answers).toEqual({
      answersDto: [{ answers: ['Berlin'], questionTitle: 'Quelle est la capitale de Paris ?' }],
      qcmId: '',
    });
  });

  test('should retrieve answers of multiple questions', async () => {
    const firstQuestion = questionDtoBuilder()
      .withTitle('Lequel de ces animaux à 4 pattes ?')
      .withAnswersProposed([
        { title: 'Un chien', isCorrect: true },
        { title: 'Un chat', isCorrect: true },
        { title: 'Un serpent', isCorrect: false },
      ])
      .build();
    const secondQuestion = questionDtoBuilder()
      .withTitle('Quelle est la capitale de Paris ?')
      .withAnswersProposed([
        { isCorrect: true, title: 'Paris' },
        { isCorrect: true, title: 'Berlin' },
      ])
      .build();

    const qcm = qcmDtoBuilder().withIsSubmitted(true).withQuestions([firstQuestion, secondQuestion]).build();
    await fakeQcmRepository.save(qcm);
    fakeAnswerPrompt.answers = ['Un chat;Un chien', 'Berlin'];

    const answers = await answerQcmWithPrompt.execute({ qcmId: '' });

    expect(answers).toEqual({
      answersDto: [
        { answers: ['Un chat', 'Un chien'], questionTitle: 'Lequel de ces animaux à 4 pattes ?' },
        { answers: ['Berlin'], questionTitle: 'Quelle est la capitale de Paris ?' },
      ],
      qcmId: '',
    });
  });

  test('should throw if qcm does not exist', async () => {
    const execute = answerQcmWithPrompt.execute({ qcmId: '' });
    expect(execute).rejects.toThrow('This QCM doesnt exist');
  });

  test('should throw if no answer retrieved', async () => {
    const firstQuestion = questionDtoBuilder()
      .withTitle('Lequel de ces animaux à 4 pattes ?')
      .withAnswersProposed([
        { title: 'Un chien', isCorrect: true },
        { title: 'Un chat', isCorrect: true },
        { title: 'Un serpent', isCorrect: false },
      ])
      .build();
    const qcm = qcmDtoBuilder().withIsSubmitted(true).withQuestions([firstQuestion]).build();
    await fakeQcmRepository.save(qcm);
    fakeAnswerPrompt.answers = [undefined as any];

    const execute = answerQcmWithPrompt.execute({ qcmId: '' });

    expect(execute).rejects.toThrow('No answer retrieved');
  });
});
