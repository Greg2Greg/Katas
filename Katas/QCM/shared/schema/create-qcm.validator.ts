import { type } from 'arktype';

const createQcmValidator = type(
  {
    title: 'string',
    answersProposed: type({ title: 'string', isCorrect: 'boolean' }, '[]'),
  },
  '[]'
);

export type CreateQcmInput = typeof createQcmValidator.infer;

export function validateCreateQcmInput(data: unknown): CreateQcmInput {
  const createQcmInput = createQcmValidator(data);
  if (createQcmInput instanceof type.errors) {
    throw new Error(`CreateQcmValidator error: ${createQcmInput.summary}`);
  }

  return createQcmInput;
}
