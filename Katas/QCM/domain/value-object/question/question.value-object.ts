import { Serializable } from '../../../shared/pattern/serializable.ts';
import { AnswerHasAlreadyBeenProposedError } from '../../entity/qcm/qcm-error.ts';
import { AnswerProposedDto, QuestionDto } from './question-type.ts';

export class Question implements Serializable<QuestionDto> {
  constructor(
    public readonly title: string,
    public readonly answersProposed: AnswerProposedDto[]
  ) {
    this.assertNoDuplicateAnswerProposed();
  }

  serialize(): QuestionDto {
    return {
      answersProposed: this.answersProposed,
      title: this.title,
    };
  }

  private assertNoDuplicateAnswerProposed() {
    const seenAnswersProposed = new Set<string>();
    for (const answer of this.answersProposed) {
      if (seenAnswersProposed.has(answer.title)) {
        throw new AnswerHasAlreadyBeenProposedError();
      }
      seenAnswersProposed.add(answer.title);
    }
  }
}
