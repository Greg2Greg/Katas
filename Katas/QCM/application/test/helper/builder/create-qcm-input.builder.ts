import { CreateQcmInput } from '../../../create-qcm.usecase.ts';

export const createQcmInputBuilder = ({ questionsDto = [] }: Partial<CreateQcmInput> = {}) => {
  const props = { questionsDto };

  return {
    build(): CreateQcmInput {
      return props;
    },
  };
};
