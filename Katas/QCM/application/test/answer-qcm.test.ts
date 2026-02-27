import { beforeEach, describe, test } from 'vitest';
import { answerDtoBuilder } from './helper/builder/answer-dto.builder.ts';
import { answerQcmInputBuilder } from './helper/builder/answer-qcm-input.builder.ts';
import { qcmDtoBuilder } from './helper/builder/qcm-dto.builder.ts';
import { questionDtoBuilder } from './helper/builder/question-dto.builder.ts';
import { createQcmFixture, QcmFixture } from './helper/fixture/qcm.fixture.ts';

describe('Feature: answer a QCM', () => {
  let qcmFixture: QcmFixture;

  beforeEach(() => {
    qcmFixture = createQcmFixture();
  });

  test('Once given, the answers have to be presented', async () => {
    const question1 = questionDtoBuilder()
      .withTitle('Quelle est la capitale de France ?')
      .withAnswersProposed([
        { title: 'Paris', isCorrect: true },
        { title: 'Berlin', isCorrect: false },
        { title: 'Canberra', isCorrect: false },
      ])
      .build();
    const question2 = questionDtoBuilder()
      .withTitle(`Quelle est la capitale de la Hongrie ?`)
      .withAnswersProposed([
        { title: 'Paris', isCorrect: false },
        { title: 'Budapest', isCorrect: true },
        { title: 'Canberra', isCorrect: false },
      ])
      .build();
    const qcm = qcmDtoBuilder().withQuestions([question1, question2]).withIsSubmitted(true).build();
    const answer1 = answerDtoBuilder().withQuestion(question1).withAnswers(['Paris']).build();
    const answer2 = answerDtoBuilder().withQuestion(question2).withAnswers(['Budapest']).build();
    const answerQcmInput = answerQcmInputBuilder().withAnswers([answer1, answer2]).build();
    qcmFixture.givenQcm(qcm);

    await qcmFixture.whenAnswerQcm(answerQcmInput);

    qcmFixture.thenQcmAnswerShouldBePresentedWith({
      answers: [
        {
          answers: ['Paris'],
          isAnswerCorrect: true,
          question: {
            answersProposed: [
              {
                isCorrect: true,
                title: 'Paris',
              },
              {
                isCorrect: false,
                title: 'Berlin',
              },
              {
                isCorrect: false,
                title: 'Canberra',
              },
            ],
            title: 'Quelle est la capitale de France ?',
          },
        },
        {
          answers: ['Budapest'],
          isAnswerCorrect: true,
          question: {
            answersProposed: [
              {
                isCorrect: false,
                title: 'Paris',
              },
              {
                isCorrect: true,
                title: 'Budapest',
              },
              {
                isCorrect: false,
                title: 'Canberra',
              },
            ],
            title: 'Quelle est la capitale de la Hongrie ?',
          },
        },
      ],
      id: '0',
      qcmId: '',
    });
  });

  test('QCM has to exist', async () => {
    const qcm = qcmDtoBuilder().withQcmId('test').build();
    const answerQcmInput = answerQcmInputBuilder().withQcmId('not-good').build();
    qcmFixture.givenQcm(qcm);

    await qcmFixture.whenAnswerQcm(answerQcmInput);

    qcmFixture.thenQcmAnswerShouldBePresentedWith('QCM does not exist');
  });

  test('QCM has to be submitted', async () => {
    const qcm = qcmDtoBuilder().build();
    const answerQcmInput = answerQcmInputBuilder().build();
    qcmFixture.givenQcm(qcm);

    await qcmFixture.whenAnswerQcm(answerQcmInput);

    qcmFixture.thenQcmAnswerShouldBePresentedWith('Qcm can not be answered if not submitted');
  });

  test('Question has to exist', async () => {
    const qcm = qcmDtoBuilder().withIsSubmitted(true).build();
    const question = questionDtoBuilder().build();
    const answer = answerDtoBuilder().withQuestion(question).build();
    const answerQcmInput = answerQcmInputBuilder().withAnswers([answer]).build();
    qcmFixture.givenQcm(qcm);

    await qcmFixture.whenAnswerQcm(answerQcmInput);

    qcmFixture.thenQcmAnswerShouldBePresentedWith('Question does not exist');
  });

  test('Answer given has to be associated to an answer proposed', async () => {
    const question = questionDtoBuilder()
      .withAnswersProposed([{ title: 'Test', isCorrect: true }])
      .build();
    const qcm = qcmDtoBuilder().withQuestions([question]).withIsSubmitted(true).build();
    const answer = answerDtoBuilder().withQuestion(question).withAnswers(['nop']).build();
    const answerQcmInput = answerQcmInputBuilder().withAnswers([answer]).build();
    qcmFixture.givenQcm(qcm);

    await qcmFixture.whenAnswerQcm(answerQcmInput);

    qcmFixture.thenQcmAnswerShouldBePresentedWith('One of given answers is not proposed in QCM');
  });

  test('Can not give same answer twice', async () => {
    const question = questionDtoBuilder()
      .withAnswersProposed([{ title: 'Test', isCorrect: true }])
      .build();
    const qcm = qcmDtoBuilder().withQuestions([question]).withIsSubmitted(true).build();
    const answer = answerDtoBuilder().withQuestion(question).withAnswers(['Test', 'Test']).build();
    const answerQcmInput = answerQcmInputBuilder().withAnswers([answer]).build();
    qcmFixture.givenQcm(qcm);

    await qcmFixture.whenAnswerQcm(answerQcmInput);

    qcmFixture.thenQcmAnswerShouldBePresentedWith('You can not given same answer twice');
  });
});
