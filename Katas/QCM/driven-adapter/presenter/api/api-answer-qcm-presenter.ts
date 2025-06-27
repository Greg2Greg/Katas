import { FastifyReply } from 'fastify';
import { AnswerQcmPresenter } from '../../../application/port/answer-qcm-presenter.ts';
import { AnsweredQcm } from '../../../domain/model/qcm.ts';

export class ApiAnswerQcmPresenter implements AnswerQcmPresenter {
  constructor(private readonly fastify: FastifyReply) {}
  present(answerQcm: AnsweredQcm[]): void {
    this.fastify.status(200).send(answerQcm);
  }

  presentError(): void {
    this.fastify.status(400);
  }
}
