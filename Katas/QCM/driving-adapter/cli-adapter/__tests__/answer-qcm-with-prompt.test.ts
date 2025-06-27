import { AnswerQcm } from '../../../application/answer-qcm.ts';
import { FakeQcmRepository } from '../../../driven-adapter/repository/fake-qcm-repository.ts';
import { AnswerQcmWithPrompt } from '../application/answer-qcm-with-prompt.ts';
import { FakeAnswerPrompt } from '../driven-adapter/fake-answer-prompt.ts';

describe('AnswerQcmWithPrompt', () => {
  test('answer a question with single wrong answer', async () => {
    const fakeQcmRepository = new FakeQcmRepository();
    const answerPrompt = new FakeAnswerPrompt(['Berlin']);
    const answerQcm = new AnswerQcm();
    const answerQcmWithPrompt = new AnswerQcmWithPrompt(fakeQcmRepository, answerPrompt, answerQcm);
    const qcm = {
      id: 'randomId',
      questions: [
        {
          title: 'Quelle est la capitale de la France ?',
          answersProposed: [
            {
              title: 'Paris',
              isCorrect: true,
            },
            {
              title: 'Berlin',
              isCorrect: false,
            },
            {
              title: 'Canberra',
              isCorrect: false,
            },
          ],
        },
      ],
    };
    await fakeQcmRepository.save(qcm);

    await answerQcmWithPrompt.execute({ qcmId: 'randomId' });

    /*expect(fakeAnsweredQcmPresenterSpy).toHaveBeenCalledWith({
      answeredQcm: [
        {
          givenAnswers: ['Berlin'],
          question: {
            title: 'Quelle est la capitale de la France ?',
            answersProposed: [
              { title: 'Paris', isCorrect: true },
              { title: 'Berlin', isCorrect: false },
              { title: 'Canberra', isCorrect: false },
            ],
          },
        },
      ],
    });*/
  });

  test('answer a question with single correct answer', async () => {
    const fakeQcmRepository = new FakeQcmRepository();
    const answerPrompt = new FakeAnswerPrompt(['Paris']);
    const answerQcm = new AnswerQcm();
    const answerQcmWithPrompt = new AnswerQcmWithPrompt(fakeQcmRepository, answerPrompt, answerQcm);
    const qcm = {
      id: 'randomId',
      questions: [
        {
          title: 'Quelle est la capitale de la France ?',
          answersProposed: [
            {
              title: 'Paris',
              isCorrect: true,
            },
            {
              title: 'Berlin',
              isCorrect: false,
            },
            {
              title: 'Canberra',
              isCorrect: false,
            },
          ],
        },
      ],
    };
    await fakeQcmRepository.save(qcm);

    await answerQcmWithPrompt.execute({ qcmId: 'randomId' });

    /*  expect(fakeAnsweredQcmPresenterSpy).toHaveBeenCalledWith({
      answeredQcm: [
        {
          givenAnswers: ['Paris'],
          question: {
            title: 'Quelle est la capitale de la France ?',
            answersProposed: [
              { title: 'Paris', isCorrect: true },
              { title: 'Berlin', isCorrect: false },
              { title: 'Canberra', isCorrect: false },
            ],
          },
        },
      ],
    });*/
  });

  test('answer a question with multiple answer but one false', async () => {
    const fakeQcmRepository = new FakeQcmRepository();
    const answerPrompt = new FakeAnswerPrompt(['Lapin Cerf Araignée']);
    const answerQcm = new AnswerQcm();
    const answerQcmWithPrompt = new AnswerQcmWithPrompt(fakeQcmRepository, answerPrompt, answerQcm);
    const qcm = {
      id: 'randomId',
      questions: [
        {
          title: 'Lapin, cerf et araignée, quels animaux ont 4 pattes ?',
          answersProposed: [
            {
              title: 'Lapin',
              isCorrect: true,
            },
            {
              title: 'Cerf',
              isCorrect: true,
            },
            {
              title: 'Araignée',
              isCorrect: false,
            },
          ],
        },
      ],
    };
    await fakeQcmRepository.save(qcm);

    await answerQcmWithPrompt.execute({ qcmId: 'randomId' });

    /* expect(fakeAnsweredQcmPresenterSpy).toHaveBeenCalledWith({
      answeredQcm: [
        {
          givenAnswers: ['Lapin', 'Cerf', 'Araignée'],
          question: {
            title: 'Lapin, cerf et araignée, quels animaux ont 4 pattes ?',
            answersProposed: [
              { title: 'Lapin', isCorrect: true },
              { title: 'Cerf', isCorrect: true },
              { title: 'Araignée', isCorrect: false },
            ],
          },
        },
      ],
    });*/
  });

  test('answer a question with multiple answer and all correct', async () => {
    const fakeQcmRepository = new FakeQcmRepository();
    const answerPrompt = new FakeAnswerPrompt(['Lapin Cerf']);
    const answerQcm = new AnswerQcm();
    const answerQcmWithPrompt = new AnswerQcmWithPrompt(fakeQcmRepository, answerPrompt, answerQcm);
    const qcm = {
      id: 'randomId',
      questions: [
        {
          title: 'Lapin, cerf et araignée, quels animaux ont 4 pattes ?',
          answersProposed: [
            {
              title: 'Lapin',
              isCorrect: true,
            },
            {
              title: 'Cerf',
              isCorrect: true,
            },
            {
              title: 'Araignée',
              isCorrect: false,
            },
          ],
        },
      ],
    };
    await fakeQcmRepository.save(qcm);

    await answerQcmWithPrompt.execute({ qcmId: 'randomId' });

    /* expect(fakeAnsweredQcmPresenterSpy).toHaveBeenCalledWith({
      answeredQcm: [
        {
          givenAnswers: ['Lapin', 'Cerf'],
          question: {
            title: 'Lapin, cerf et araignée, quels animaux ont 4 pattes ?',
            answersProposed: [
              { title: 'Lapin', isCorrect: true },
              { title: 'Cerf', isCorrect: true },
              { title: 'Araignée', isCorrect: false },
            ],
          },
        },
      ],
    });*/
  });

  test('answer multiple questions with multiple answer and all correct', async () => {
    const fakeQcmRepository = new FakeQcmRepository();
    const answerPrompt = new FakeAnswerPrompt(['Lapin Cerf', 'Paris']);
    const answerQcm = new AnswerQcm();
    const answerQcmWithPrompt = new AnswerQcmWithPrompt(fakeQcmRepository, answerPrompt, answerQcm);
    const qcm = {
      id: 'randomId',
      questions: [
        {
          title: 'Lapin, cerf et araignée, quels animaux ont 4 pattes ?',
          answersProposed: [
            {
              title: 'Lapin',
              isCorrect: true,
            },
            {
              title: 'Cerf',
              isCorrect: true,
            },
            {
              title: 'Araignée',
              isCorrect: false,
            },
          ],
        },
        {
          title: 'Quelle est la capitale de la France ?',
          answersProposed: [
            {
              title: 'Paris',
              isCorrect: true,
            },
            {
              title: 'Berlin',
              isCorrect: false,
            },
            {
              title: 'Canberra',
              isCorrect: false,
            },
          ],
        },
      ],
    };
    await fakeQcmRepository.save(qcm);

    await answerQcmWithPrompt.execute({ qcmId: 'randomId' });

    /* expect(fakeAnsweredQcmPresenterSpy).toHaveBeenCalledWith({
      answeredQcm: [
        {
          givenAnswers: ['Lapin', 'Cerf'],
          question: {
            title: 'Lapin, cerf et araignée, quels animaux ont 4 pattes ?',
            answersProposed: [
              { title: 'Lapin', isCorrect: true },
              { title: 'Cerf', isCorrect: true },
              { title: 'Araignée', isCorrect: false },
            ],
          },
        },
        {
          givenAnswers: ['Paris'],
          question: {
            title: 'Quelle est la capitale de la France ?',
            answersProposed: [
              { title: 'Paris', isCorrect: true },
              { title: 'Berlin', isCorrect: false },
              { title: 'Canberra', isCorrect: false },
            ],
          },
        },
      ],
    });*/
  });
});
