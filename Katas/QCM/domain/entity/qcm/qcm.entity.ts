import { Entity } from '../../../shared/abstraction/entity.ts';
import { Question } from '../../value-object/question/question.value-object.ts';
import {
  CannotAddQuestionWhenQcmIsSubmittedError,
  CannotSubmitTwiceError,
  MaxQuestionsExceededError,
  QuestionAlreadyExistsError,
} from './qcm-error.ts';
import { QcmDto, QcmProps } from './qcm-type.ts';

export class Qcm extends Entity<QcmProps, QcmDto> {
  private constructor(qcmProps: QcmProps) {
    super(qcmProps);
  }

  static create(qcmProps: QcmProps): Qcm {
    const qcm = new Qcm(qcmProps);
    return qcm;
  }

  submit() {
    this.assertCannotSubmitTwice();
    this.props.isSubmitted = true;
  }

  addQuestions(questions: Question[]) {
    for (const question of questions) {
      this.addQuestion(question);
    }
  }

  isSubmitted() {
    return this.props.isSubmitted;
  }

  findQuestionByTitle(title: string): Question | null {
    const question = this.props.questions.find((question) => {
      return question.title === title;
    });

    if (question === undefined) {
      return null;
    }

    return question;
  }

  serialize(): QcmDto {
    return {
      id: this.props.id,
      isSubmitted: this.props.isSubmitted,
      questions: this.props.questions.map((question) => question.serialize()),
    };
  }

  private addQuestion(question: Question) {
    this.assertNoDuplicateQuestion(question);
    this.assertMaxTenQuestions(this.props.questions.length + 1);
    this.assertNoQuestionAddWhenQcmIsClosed();

    this.props.questions.push(question);
  }

  private assertMaxTenQuestions(numberOfQuestions: number) {
    if (numberOfQuestions > 9) {
      throw new MaxQuestionsExceededError();
    }
  }

  private assertNoDuplicateQuestion(question: Question) {
    const isQuestionAlreadyExisting = this.props.questions.find((storedQuestion) => {
      return storedQuestion.title === question.title;
    });

    if (isQuestionAlreadyExisting) {
      throw new QuestionAlreadyExistsError();
    }
  }

  private assertNoQuestionAddWhenQcmIsClosed() {
    if (this.props.isSubmitted) {
      throw new CannotAddQuestionWhenQcmIsSubmittedError();
    }
  }

  private assertCannotSubmitTwice() {
    if (this.props.isSubmitted) {
      throw new CannotSubmitTwiceError();
    }
  }
}
