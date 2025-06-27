import { AnswerProposed, Question } from '../../../domain/model/qcm.ts';
import { QuestionPrompt } from '../application/ports/question-prompt.ts';

export class FakeQuestionPrompt implements QuestionPrompt {
  private currentQuestion: Question | null = null;

  constructor(private readonly questions: Question[]) {}

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

  async nextAnswer(): Promise<AnswerProposed | null> {
    if (!this.currentQuestion) {
      throw new Error('There is nor current question');
    }

    const answer = this.currentQuestion.answersProposed.shift();

    if (!answer) {
      return null;
    }

    return answer;
  }
}
