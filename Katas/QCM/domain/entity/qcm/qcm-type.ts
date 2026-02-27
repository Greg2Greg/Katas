import { QuestionDto } from '../../value-object/question/question-type.ts';
import { Question } from '../../value-object/question/question.value-object.ts';

export type QcmProps = {
  id: string;
  isSubmitted: boolean;
  questions: Question[];
};

export type QcmDto = { id: string; isSubmitted: boolean; questions: QuestionDto[] };
