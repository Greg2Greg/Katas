import { QuestionDto } from '../question/question-type.ts';

export type AnswerDto = {
  question: QuestionDto;
  answers: string[];
  isAnswerCorrect: boolean;
};
