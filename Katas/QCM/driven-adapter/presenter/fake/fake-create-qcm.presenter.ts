import { CreateQcmPresenter } from '../../../application/port/create-qcm.presenter.ts';
import { QcmDto } from '../../../domain/entity/qcm/qcm-type.ts';

export class FakeCreateQcmPresenter implements CreateQcmPresenter {
  message: QcmDto | string | undefined = undefined;

  present(qcmDto: QcmDto): void {
    this.message = qcmDto;
  }

  presentError(message: string): void {
    this.message = message;
  }
}
