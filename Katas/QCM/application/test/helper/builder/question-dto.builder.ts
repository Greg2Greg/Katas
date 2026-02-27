import { AnswerProposedDto, QuestionDto } from '../../../../domain/value-object/question/question-type.ts';

export function createIndiviualQuestionDto(length: number): QuestionDto[] {
  const tmp: QuestionDto[] = [];
  for (let i = 0; i < length; i++) {
    tmp.push({
      title: i.toString(),
      answersProposed: [],
    });
  }

  return tmp;
}

export const questionDtoBuilder = ({ title = '', answersProposed = [] }: Partial<QuestionDto> = {}) => {
  const props = { title, answersProposed };

  return {
    withTitle(title: string) {
      return questionDtoBuilder({ ...props, title });
    },

    withAnswersProposed(answersProposed: AnswerProposedDto[]) {
      return questionDtoBuilder({ ...props, answersProposed });
    },

    build(): QuestionDto {
      return props;
    },
  };
};
