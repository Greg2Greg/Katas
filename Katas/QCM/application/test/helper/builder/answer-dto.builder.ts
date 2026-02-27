import { AnswerDto } from '../../../../domain/value-object/answer/answer-type.ts';
import { QuestionDto } from '../../../../domain/value-object/question/question-type.ts';

export const answerDtoBuilder = ({
  question = { title: '', answersProposed: [] },
  answers = [],
  isAnswerCorrect = false,
}: Partial<AnswerDto> = {}) => {
  const props = { question, answers, isAnswerCorrect };

  return {
    withQuestion(question: QuestionDto) {
      return answerDtoBuilder({ ...props, question });
    },

    withAnswers(answers: string[]) {
      return answerDtoBuilder({ ...props, answers });
    },

    build(): AnswerDto {
      return props;
    },
  };
};
