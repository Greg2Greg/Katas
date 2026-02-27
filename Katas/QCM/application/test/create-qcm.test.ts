import { describe, beforeEach, test } from 'vitest';
import {
  CannotAddQuestionWhenQcmIsSubmittedError,
  CannotSubmitTwiceError,
} from '../../domain/entity/qcm/qcm-error.ts';
import { createQcmInputBuilder } from './helper/builder/create-qcm-input.builder.ts';
import { qcmDtoBuilder } from './helper/builder/qcm-dto.builder.ts';
import { questionDtoBuilder, createIndiviualQuestionDto } from './helper/builder/question-dto.builder.ts';
import { QcmFixture, createQcmFixture } from './helper/fixture/qcm.fixture.ts';

describe('Feature: create a QCM', () => {
  let qcmFixture: QcmFixture;

  beforeEach(() => {
    qcmFixture = createQcmFixture();
  });

  /*
   Should be 3 different tests. Here, it's already a big step from TDD point of view.
   But since I was confident on the way to do it, I directly pass this test then refactor.
  */
  test('Once created, QCM has to be submitted, persisted and presented', async () => {
    const firstQuestion = questionDtoBuilder()
      .withTitle('Lequel de ces animaux à 4 pattes ?')
      .withAnswersProposed([
        { title: 'Un chien', isCorrect: true },
        { title: 'Un chat', isCorrect: true },
        { title: 'Un serpent', isCorrect: false },
      ])
      .build();
    const secondQuestion = questionDtoBuilder()
      .withTitle('Lequel de ces animaux est invertébré ?')
      .withAnswersProposed([
        { title: 'Un serpent', isCorrect: true },
        { title: 'Un chat', isCorrect: false },
        { title: 'Un chien', isCorrect: false },
      ])
      .build();
    const createQcmInput = createQcmInputBuilder({ questionsDto: [firstQuestion, secondQuestion] }).build();

    await qcmFixture.whenCreateQcm(createQcmInput);

    const expectedQcmDto = {
      id: '0',
      isSubmitted: true,
      questions: [
        {
          title: 'Lequel de ces animaux à 4 pattes ?',
          answersProposed: [
            { title: 'Un chien', isCorrect: true },
            { title: 'Un chat', isCorrect: true },
            { title: 'Un serpent', isCorrect: false },
          ],
        },
        {
          title: 'Lequel de ces animaux est invertébré ?',
          answersProposed: [
            { title: 'Un serpent', isCorrect: true },
            { title: 'Un chat', isCorrect: false },
            { title: 'Un chien', isCorrect: false },
          ],
        },
      ],
    };
    await qcmFixture.thenQcmShouldBePersistedWith(expectedQcmDto);
    await qcmFixture.thenQcmShouldBeSubmitted();
    qcmFixture.thenQcmShouldBePresentedWith(expectedQcmDto);
  });

  test('Reject creation of QCM when a question contains duplicate answers', async () => {
    const questionDto = questionDtoBuilder()
      .withAnswersProposed([
        { title: 'Un chien', isCorrect: true },
        { title: 'Un chien', isCorrect: false },
      ])
      .build();
    const createQcmInput = createQcmInputBuilder({ questionsDto: [questionDto] }).build();

    await qcmFixture.whenCreateQcm(createQcmInput);

    qcmFixture.thenQcmShouldBePresentedWith('Can not propose the same answer twice');
  });

  test('Reject creation of QCM when duplicate question', async () => {
    const firstQuestionDto = questionDtoBuilder().withTitle('Un chien').build();
    const secondQuestionDto = questionDtoBuilder().withTitle('Un chien').build();
    const createQcmInput = createQcmInputBuilder({
      questionsDto: [firstQuestionDto, secondQuestionDto],
    }).build();

    await qcmFixture.whenCreateQcm(createQcmInput);

    qcmFixture.thenQcmShouldBePresentedWith('This question already exists for this QCM');
  });

  test('Reject creation of QCM when more than 10 questions', async () => {
    await qcmFixture.whenCreateQcm({ questionsDto: createIndiviualQuestionDto(10) });

    qcmFixture.thenQcmShouldBePresentedWith('A QCM can not have more than 10 questions');
  });

  test('Reject adding a question when QCM is submitted', async () => {
    const qcmDto = qcmDtoBuilder().withIsSubmitted(true).withQcmId('test-id').build();
    const questionDto = questionDtoBuilder().build();
    await qcmFixture.givenQcm(qcmDto);

    await qcmFixture.whenAddQuestion(questionDto, 'test-id');

    qcmFixture.thenShouldThrow(CannotAddQuestionWhenQcmIsSubmittedError);
  });

  test('Reject submitting a QCM twice', async () => {
    const qcmDto = qcmDtoBuilder().withIsSubmitted(true).withQcmId('test-id').build();
    await qcmFixture.givenQcm(qcmDto);

    await qcmFixture.whenSubmit('test-id');

    qcmFixture.thenShouldThrow(CannotSubmitTwiceError);
  });
});
