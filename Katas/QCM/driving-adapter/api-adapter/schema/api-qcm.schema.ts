import { type } from 'arktype';

export const qcmValidator = type({
  id: 'string',
  questions: type(
    {
      title: 'string',
      answersProposed: type({ title: 'string', isCorrect: 'boolean' }, '[]'),
    },
    '[]'
  ),
});

export const answeredQcmValidator = type(
  {
    question: type({
      title: 'string',
      answersProposed: type({ title: 'string', isCorrect: 'boolean' }, '[]'),
    }),
    givenAnswers: 'string[]',
  },
  '[]'
);
