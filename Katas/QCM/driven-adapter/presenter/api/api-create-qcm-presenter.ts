import { FastifyReply } from 'fastify';
import { CreateQcmPresenter } from '../../../application/port/create-qcm-presenter.ts';
import { Qcm } from '../../../domain/model/qcm.ts';

export class ApiCreateQcmPresenter implements CreateQcmPresenter {
  constructor(private readonly fastify: FastifyReply) {}

  present(qcm: Qcm): void {
    this.fastify.status(200).send(qcm);
  }

  presentError(): void {
    this.fastify.status(400);
  }
}
