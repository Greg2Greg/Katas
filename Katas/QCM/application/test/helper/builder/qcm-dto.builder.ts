import { QcmDto } from '../../../../domain/entity/qcm/qcm-type.ts';
import { QuestionDto } from '../../../../domain/value-object/question/question-type.ts';

export const qcmDtoBuilder = ({ id = '', isSubmitted = false, questions = [] }: Partial<QcmDto> = {}) => {
  const props = { id, isSubmitted, questions };

  return {
    withIsSubmitted(isSubmitted: boolean) {
      return qcmDtoBuilder({
        ...props,
        isSubmitted,
      });
    },

    withQuestions(questions: QuestionDto[]) {
      return qcmDtoBuilder({
        ...props,
        questions,
      });
    },

    withQcmId(id: string) {
      return qcmDtoBuilder({
        ...props,
        id,
      });
    },

    build(): QcmDto {
      return props;
    },
  };
};
