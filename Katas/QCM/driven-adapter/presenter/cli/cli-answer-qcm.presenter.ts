import { AnswerQcmPresenter } from '../../../application/port/answer-qcm.presenter.ts';
import { QcmAnswerDto } from '../../../domain/entity/qcm-answer/qcm-answer-type.ts';

export class CliAnswerQcmPresenter implements AnswerQcmPresenter {
  present(qcmAnswerDto: QcmAnswerDto): void {
    const numberOfQuestions = qcmAnswerDto.answers.length;

    let score = 0;
    console.log(`Chaque bonne réponse augmente le score d'un point`);
    qcmAnswerDto.answers.forEach((answer, i) => {
      const questionTitle = answer.question.title;
      const correctAnswers = answer.question.answersProposed
        .filter((answer) => answer.isCorrect === true)
        .map((correctAnswer) => correctAnswer.title);

      const answers = answer.answers;

      if (answer.isAnswerCorrect) {
        score++;
      }

      console.log(`================================`);
      console.log(`Question ${i + 1}) ${questionTitle}`);

      console.log(`Réponse(s) donnée(s): ${answers}`);
      console.log(`Réponse(s) correcte(s): ${correctAnswers}`);
      console.log(`Score: ${score}/${numberOfQuestions}`);
      console.log('\n\n');
    });
  }

  presentError(message: string): void {
    console.log(message);
  }
}
