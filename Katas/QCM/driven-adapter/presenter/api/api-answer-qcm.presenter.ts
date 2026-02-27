import { AnswerQcmPresenter } from '../../../application/port/answer-qcm.presenter.ts';
import { QcmAnswerDto } from '../../../domain/entity/qcm-answer/qcm-answer-type.ts';
import { WebserverReplier } from '../../../shared/abstraction/webserver-replier.ts';

export class ApiAnswerQcmPresenter implements AnswerQcmPresenter {
  constructor(private readonly webserverReplier: WebserverReplier) {}

  present(qcmAnswerDto: QcmAnswerDto): void {
    this.webserverReplier.replyJSON({ status: 200, payload: qcmAnswerDto });
  }

  presentError(message: string): void {
    this.webserverReplier.replyJSON({ status: 400, payload: { message } });
  }
}
