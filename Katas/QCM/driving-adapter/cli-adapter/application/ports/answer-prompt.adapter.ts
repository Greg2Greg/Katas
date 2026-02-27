import { QuestionDto } from '../../../../domain/value-object/question/question-type.ts';

export interface AnswerPromptAdapter {
  retrieveAnswer(question: QuestionDto): Promise<string[] | null>;
}
