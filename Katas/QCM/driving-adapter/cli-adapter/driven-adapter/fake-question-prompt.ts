import { AnswerProposedDto, QuestionDto } from '../../../domain/value-object/question/question-type.ts';
import { QuestionPromptAdapter } from '../application/ports/question-prompt.adapter.ts';

export class FakeQuestionPrompt implements QuestionPromptAdapter {
  private currentQuestion: QuestionDto | null = null;
  questions: QuestionDto[];

  async nextQuestion(): Promise<string | null> {
    if (!this.questions || this.questions.length === 0) {
      return null;
    }

    const question = this.questions.shift();

    if (!question) {
      return null;
    }

    this.currentQuestion = question;
    return question.title;
  }

  async nextAnswerProposed(): Promise<AnswerProposedDto | null> {
    if (!this.currentQuestion) {
      throw new Error('There is no current question');
    }

    const answer = this.currentQuestion.answersProposed.shift();

    if (!answer) {
      return null;
    }

    return answer;
  }
}
