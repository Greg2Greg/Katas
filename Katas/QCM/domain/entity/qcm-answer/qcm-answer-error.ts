export class QcmDoesNotExistError extends Error {
  constructor() {
    super('QCM does not exist');
  }
}

export class QcmCannotBeAnsweredIfNotSubmittedError extends Error {
  constructor() {
    super('Qcm can not be answered if not submitted');
  }
}

export class QuestionDoesNotExist extends Error {
  constructor() {
    super('Question does not exist');
  }
}

export class GivenAnswersAreNotProposedInQcmError extends Error {
  constructor() {
    super('One of given answers is not proposed in QCM');
  }
}

export class SameAnswerHasAlreadyBeenGivenError extends Error {
  constructor() {
    super('You can not given same answer twice');
  }
}
