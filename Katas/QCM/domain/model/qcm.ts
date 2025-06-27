export type AnswerProposed = { title: string; isCorrect: boolean };

export type Question = {
  title: string;
  answersProposed: AnswerProposed[];
};

export type Qcm = {
  id: string;
  questions: Question[];
};

export type AnsweredQcm = {
  question: Question;
  givenAnswers: string[];
};
