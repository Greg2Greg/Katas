import { AnswerProposed } from '../../../../domain/model/qcm.ts';

export interface QuestionPrompt {
  nextQuestion(): Promise<string | null>;
  nextAnswer(): Promise<AnswerProposed | null>;
}
