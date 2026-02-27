export class AnswerHasAlreadyBeenProposedError extends Error {
  constructor() {
    super('Can not propose the same answer twice');
  }
}

export class QuestionAlreadyExistsError extends Error {
  constructor() {
    super('This question already exists for this QCM');
  }
}

export class MaxQuestionsExceededError extends Error {
  constructor() {
    super('A QCM can not have more than 10 questions');
  }
}

export class CannotAddQuestionWhenQcmIsSubmittedError extends Error {
  constructor() {
    super('Can not add question when QCM is submitted');
  }
}

export class CannotSubmitTwiceError extends Error {
  constructor() {
    super('Can not submit twice a QCM');
  }
}
