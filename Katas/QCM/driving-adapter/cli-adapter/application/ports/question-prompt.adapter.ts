import { AnswerProposedDto } from '../../../../domain/value-object/question/question-type.ts';

export interface QuestionPromptAdapter {
  nextQuestion(): Promise<string | null>;
  nextAnswerProposed(): Promise<AnswerProposedDto | null>;
}
