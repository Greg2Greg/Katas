import { areArraysEqual } from '../../../shared/function/array-equality.ts';
import { Serializable } from '../../../shared/pattern/serializable.ts';
import {
  GivenAnswersAreNotProposedInQcmError,
  SameAnswerHasAlreadyBeenGivenError,
} from '../../entity/qcm-answer/qcm-answer-error.ts';
import { Question } from '../question/question.value-object.ts';
import { AnswerDto } from './answer-type.ts';

export class Answer implements Serializable<AnswerDto> {
  private _isAnswerCorrect = false;

  constructor(
    public readonly question: Question,
    public readonly answers: string[]
  ) {
    this.assertAnswersGivenAreProposeByQcm();
    this.assertSameAnswerHasNotBeenGivenTwice();
    this.defineIfAnswerIsCorrect();
  }

  serialize(): AnswerDto {
    return {
      answers: this.answers,
      isAnswerCorrect: this._isAnswerCorrect,
      question: this.question.serialize(),
    };
  }

  private assertAnswersGivenAreProposeByQcm() {
    this.answers.every((answer) => {
      const isAnswerProposedByQcm = this.question.answersProposed.find(
        (answerProposed) => answerProposed.title === answer
      );

      if (isAnswerProposedByQcm) {
        return true;
      }

      throw new GivenAnswersAreNotProposedInQcmError();
    });
  }

  private assertSameAnswerHasNotBeenGivenTwice() {
    const seenAnswers = new Set<string>();
    for (const answer of this.answers) {
      if (seenAnswers.has(answer)) {
        throw new SameAnswerHasAlreadyBeenGivenError();
      }
      seenAnswers.add(answer);
    }
  }

  private defineIfAnswerIsCorrect() {
    const correctAnswers = this.question.answersProposed
      .filter((answer) => answer.isCorrect === true)
      .map((correctAnswers) => correctAnswers.title);

    if (areArraysEqual(this.answers, correctAnswers)) {
      this._isAnswerCorrect = true;
    }
  }
}
