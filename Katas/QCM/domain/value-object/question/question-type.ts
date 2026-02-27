export type AnswerProposedDto = { title: string; isCorrect: boolean };

export type QuestionDto = {
  title: string;
  answersProposed: AnswerProposedDto[];
};
