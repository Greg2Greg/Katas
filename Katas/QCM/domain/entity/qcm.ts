/*private calculateScore(answeredQcm: AnsweredQcm[]): number {
    let score = 0;

    answeredQcm.forEach((questionAnswered) => {
      const correctAnswers = questionAnswered.question.answersProposed
        .filter((answerProposed) => answerProposed.isCorrect === true)
        .map((correctAnswer) => correctAnswer.title);

      const givenAnswers = questionAnswered.givenAnswers;
      const isAnswerGivenCorrect = givenAnswers.every((givenAnswer) => {
        return correctAnswers.includes(givenAnswer);
      });

      if (isAnswerGivenCorrect) {
        score++;
      }
    });

    return score;
  }*/
