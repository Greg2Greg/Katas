import { describe, beforeEach, test, expect } from 'vitest';
import { FakeQuestionPrompt } from '../../driven-adapter/fake-question-prompt.ts';
import { ComposeQcmWithPrompt } from '../compose-qcm-with-prompt.ts';
import { questionDtoBuilder } from '../../../../application/test/helper/builder/question-dto.builder.ts';

describe('Feature: compose a QCM with prompt', () => {
  let questionPrompt: FakeQuestionPrompt;
  let composeQcmWithPrompt: ComposeQcmWithPrompt;

  beforeEach(() => {
    questionPrompt = new FakeQuestionPrompt();
    composeQcmWithPrompt = new ComposeQcmWithPrompt({ questionPrompt });
  });

  test('should retrieve a question with multiple answers', async () => {
    const singleQuestion = questionDtoBuilder()
      .withTitle('Lequel de ces animaux à 4 pattes ?')
      .withAnswersProposed([
        { title: 'Un chien', isCorrect: true },
        { title: 'Un chat', isCorrect: true },
        { title: 'Un serpent', isCorrect: false },
      ])
      .build();

    questionPrompt.questions = [singleQuestion];
    const qcmQuestions = await composeQcmWithPrompt.execute();

    expect(qcmQuestions).toEqual({
      questionsDto: [
        {
          title: 'Lequel de ces animaux à 4 pattes ?',
          answersProposed: [
            { title: 'Un chien', isCorrect: true },
            { title: 'Un chat', isCorrect: true },
            { title: 'Un serpent', isCorrect: false },
          ],
        },
      ],
    });
  });

  test('should retrieve a question with multiple answers', async () => {
    const firstQuestion = questionDtoBuilder()
      .withTitle('Lequel de ces animaux à 4 pattes ?')
      .withAnswersProposed([
        { title: 'Un chien', isCorrect: true },
        { title: 'Un chat', isCorrect: true },
        { title: 'Un serpent', isCorrect: false },
      ])
      .build();
    const secondQuestion = questionDtoBuilder()
      .withTitle('Quelle est la capitale de France ?')
      .withAnswersProposed([
        { title: 'Paris', isCorrect: true },
        { title: 'Berlin', isCorrect: false },
        { title: 'Canberra', isCorrect: false },
      ])
      .build();

    questionPrompt.questions = [firstQuestion, secondQuestion];
    const qcmQuestions = await composeQcmWithPrompt.execute();

    expect(qcmQuestions).toEqual({
      questionsDto: [
        {
          title: 'Lequel de ces animaux à 4 pattes ?',
          answersProposed: [
            { title: 'Un chien', isCorrect: true },
            { title: 'Un chat', isCorrect: true },
            { title: 'Un serpent', isCorrect: false },
          ],
        },
        {
          title: 'Quelle est la capitale de France ?',
          answersProposed: [
            { title: 'Paris', isCorrect: true },
            { title: 'Berlin', isCorrect: false },
            { title: 'Canberra', isCorrect: false },
          ],
        },
      ],
    });
  });
});
