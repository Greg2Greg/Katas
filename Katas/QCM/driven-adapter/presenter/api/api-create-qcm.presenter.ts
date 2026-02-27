import { CreateQcmPresenter } from '../../../application/port/create-qcm.presenter.ts';
import { QcmDto } from '../../../domain/entity/qcm/qcm-type.ts';
import { WebserverReplier } from '../../../shared/abstraction/webserver-replier.ts';

export class ApiCreateQcmPresenter implements CreateQcmPresenter {
  constructor(private readonly webserverReplier: WebserverReplier) {}

  present(qcmDto: QcmDto): void {
    this.webserverReplier.replyJSON({ status: 200, payload: qcmDto });
  }

  presentError(message: string): void {
    this.webserverReplier.replyJSON({ status: 400, payload: { message } });
  }
}
