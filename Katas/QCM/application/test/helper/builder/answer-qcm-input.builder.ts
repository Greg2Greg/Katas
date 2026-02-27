import { AnswerDto } from '../../../../domain/value-object/answer/answer-type.ts';
import { AnswerQcmInput } from '../../../answer-qcm.usecase.ts';

export const answerQcmInputBuilder = ({ answersDto = [], qcmId = '' }: Partial<AnswerQcmInput> = {}) => {
  const props = { answersDto, qcmId };

  return {
    withAnswers(answersDto: AnswerDto[]) {
      const answersDtoMappedToAnswersDtoInput: { questionTitle: string; answers: string[] }[] =
        answersDto.map((answerDto) => {
          return { questionTitle: answerDto.question.title, answers: answerDto.answers };
        });

      return answerQcmInputBuilder({ ...props, answersDto: answersDtoMappedToAnswersDtoInput });
    },

    withQcmId(qcmId: string) {
      return answerQcmInputBuilder({ ...props, qcmId });
    },

    build(): AnswerQcmInput {
      return props;
    },
  };
};
