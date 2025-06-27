import { CreateQcm } from '../../../application/create-qcm.ts';
import { QcmRepository } from '../../../application/port/qcm-repository.ts';
import { FakeQcmRepository } from '../../../driven-adapter/repository/fake-qcm-repository.ts';
import { StubUuidProvider } from '../../../shared/provider/uuid/stub-uuid-provider.ts';
import { ComposeQcmWithPrompt } from '../application/compose-qcm-with-prompt.ts';
import { FakeQuestionPrompt } from '../driven-adapter/fake-question-prompt.ts';

describe('ComposeQcmWithPrompt', () => {
  /*
    On sait que notre CreateQcm a pour vocation la création d'un QCM
    via prompt. Et c'est cette orchestration qu'on veut tester.

    Tester la création d'un QCM de manière programmative comme ici
    n'a pas vraiment de sens, car ça ne reflète pas un cas d'usage réel.
    En allant au bout de cette logique de test, cela nous emmènerait
    vers l'implémentation d'une classe Qcm avec une API comportementale
    (addQuestion, closeQcm, resume, ...). Qcm étant un objet du domain
    que l'on test directement. Or, tester le domain directement = 
    test fragile. Il faut tester un cas d'usage **utilisateur** en partant 
    de l'application service (usecase / command) via outside-in. 
    En testant de manière programmative, on ne part pas du point de vu
    utilisateur, mais d'un point de vu programmeur.

    On pourrait croire que c'est une bonne manière de tester, car voit
    l'émergence des types et des interfaces. Mais cela se produit également
    dans le cas d'un test indirect via application service.

  test('Should create a qcm', async () => {
    const question = [
      {
        title: `What's the capital of Paris ? `,
        answersProposed: [
          { title: 'Istanbul', isCorrect: false },
          { title: 'Madrid', isCorrect: false },
          { title: 'Paris', isCorrect: true },
        ],
      },
    ];
    const qcmId = '1';
    const fakeQcmRepository = new FakeQcmRepository();
    const stubUuidProvider = new StubUuidProvider(qcmId);

    const createQcm = new ComposeQcmWithPrompt(fakeQcmRepository, stubUuidProvider);

    await createQcm.execute({ questions: question });

    const qcm = await fakeQcmRepository.getById(qcmId);
    expect(qcm).toEqual({
      id: '1',
      questions: [
        {
          title: `What's the capital of Paris ? `,
          answersProposed: [
            { title: 'Istanbul', isCorrect: false },
            { title: 'Madrid', isCorrect: false },
            { title: 'Paris', isCorrect: true },
          ],
        },
      ],
    });
  });
 */
  let fakeQcmRepository: QcmRepository;
  let stubUuidProvider: StubUuidProvider;
  let createQcm: CreateQcm;

  beforeEach(() => {
    fakeQcmRepository = new FakeQcmRepository();
    stubUuidProvider = new StubUuidProvider('randomId');
    createQcm = new CreateQcm(fakeQcmRepository);
  });

  test('Create a qcm with no questions', async () => {
    const fakeQuestionPrompt = new FakeQuestionPrompt([]);
    const composeQcm = new ComposeQcmWithPrompt(fakeQuestionPrompt, stubUuidProvider, createQcm);

    await composeQcm.execute();

    const qcm = await fakeQcmRepository.findById('randomId');
    expect(qcm).toEqual({ id: 'randomId', questions: [] });
  });

  /*
    A partir d'ici, je dois inclure la notion de prompt. Le prompt
    est injecté au CreateQcm, c'est lui qui va orchestrer peu importe
    l'implémentation du prompt.
  */
  test('Create a qcm with a single question without response', async () => {
    const fakeQuestionPrompt = new FakeQuestionPrompt([
      { title: 'What is the capital of France ?', answersProposed: [] },
    ]);

    const composeQcm = new ComposeQcmWithPrompt(fakeQuestionPrompt, stubUuidProvider, createQcm);

    await composeQcm.execute();

    const qcm = await fakeQcmRepository.findById('randomId');
    expect(qcm).toEqual({
      id: 'randomId',
      questions: [{ title: 'What is the capital of France ?', answersProposed: [] }],
    });
  });

  test('Create a qcm with two questions without response', async () => {
    const fakeQuestionPrompt = new FakeQuestionPrompt([
      { title: 'What is the capital of France ?', answersProposed: [] },
      { title: 'What is the capital of Berlin ?', answersProposed: [] },
    ]);

    const composeQcm = new ComposeQcmWithPrompt(fakeQuestionPrompt, stubUuidProvider, createQcm);

    await composeQcm.execute();

    const qcm = await fakeQcmRepository.findById('randomId');
    expect(qcm).toEqual({
      id: 'randomId',
      questions: [
        { title: 'What is the capital of France ?', answersProposed: [] },
        { title: 'What is the capital of Berlin ?', answersProposed: [] },
      ],
    });
  });

  test('Create a qcm with one question with single answer', async () => {
    const fakeQuestionPrompt = new FakeQuestionPrompt([
      { title: 'What is the capital of France ?', answersProposed: [{ title: 'Berlin', isCorrect: false }] },
    ]);
    const composeQcm = new ComposeQcmWithPrompt(fakeQuestionPrompt, stubUuidProvider, createQcm);

    await composeQcm.execute();

    const qcm = await fakeQcmRepository.findById('randomId');
    expect(qcm).toEqual({
      id: 'randomId',
      questions: [
        {
          title: 'What is the capital of France ?',
          answersProposed: [{ title: 'Berlin', isCorrect: false }],
        },
      ],
    });
  });

  test('Create a qcm with one question with multiple answersProposed', async () => {
    const fakeQuestionPrompt = new FakeQuestionPrompt([
      {
        title: 'What is the capital of France ?',
        answersProposed: [
          { title: 'Berlin', isCorrect: false },
          { title: 'Madrid', isCorrect: false },
          { title: 'Paris', isCorrect: true },
        ],
      },
    ]);
    const composeQcm = new ComposeQcmWithPrompt(fakeQuestionPrompt, stubUuidProvider, createQcm);

    await composeQcm.execute();

    const qcm = await fakeQcmRepository.findById('randomId');
    expect(qcm).toEqual({
      id: 'randomId',
      questions: [
        {
          title: 'What is the capital of France ?',
          answersProposed: [
            { title: 'Berlin', isCorrect: false },
            { title: 'Madrid', isCorrect: false },
            { title: 'Paris', isCorrect: true },
          ],
        },
      ],
    });
  });

  test('Create a qcm with multiple questions and multiple answersProposed', async () => {
    const fakeQuestionPrompt = new FakeQuestionPrompt([
      {
        title: 'What is the capital of France ?',
        answersProposed: [
          { title: 'Berlin', isCorrect: false },
          { title: 'Madrid', isCorrect: false },
          { title: 'Paris', isCorrect: true },
        ],
      },
      {
        title: 'What is the capital of Germany ?',
        answersProposed: [
          { title: 'Berlin', isCorrect: true },
          { title: 'Canberra', isCorrect: false },
          { title: 'Dublin', isCorrect: false },
        ],
      },
    ]);
    const composeQcm = new ComposeQcmWithPrompt(fakeQuestionPrompt, stubUuidProvider, createQcm);

    await composeQcm.execute();

    const qcm = await fakeQcmRepository.findById('randomId');
    expect(qcm).toEqual({
      id: 'randomId',
      questions: [
        {
          title: 'What is the capital of France ?',
          answersProposed: [
            { title: 'Berlin', isCorrect: false },
            { title: 'Madrid', isCorrect: false },
            { title: 'Paris', isCorrect: true },
          ],
        },
        {
          title: 'What is the capital of Germany ?',
          answersProposed: [
            { title: 'Berlin', isCorrect: true },
            { title: 'Canberra', isCorrect: false },
            { title: 'Dublin', isCorrect: false },
          ],
        },
      ],
    });
  });
});
