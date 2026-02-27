import { type } from 'arktype';

export const answerQcmValidator = type({
  qcmId: 'string',
  answers: type(
    {
      questionTitle: 'string',
      answers: 'string[]',
    },
    '[]'
  ),
});

export type AnswerQcmInput = typeof answerQcmValidator.infer;

export function validateAnswerQcmInput(data: unknown): AnswerQcmInput {
  const answerQcmInput = answerQcmValidator(data);
  if (answerQcmInput instanceof type.errors) {
    throw new Error(`AnswerQcmValidator error: ${answerQcmInput.summary}`);
  }

  return answerQcmInput;
}
