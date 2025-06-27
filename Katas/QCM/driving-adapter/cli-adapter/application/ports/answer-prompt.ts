import { Question } from '../../../../domain/model/qcm.ts';

export interface AnswerPrompt {
  retrieveAnswer(question: Question): Promise<string[] | null>;
}
