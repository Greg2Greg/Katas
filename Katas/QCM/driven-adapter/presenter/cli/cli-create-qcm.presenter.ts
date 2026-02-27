import { CreateQcmPresenter } from '../../../application/port/create-qcm.presenter.ts';
import { QcmDto } from '../../../domain/entity/qcm/qcm-type.ts';

export class CliCreateQcmPresenter implements CreateQcmPresenter {
  present(qcmDto: QcmDto): void {
    console.log(`QCM Created: ${JSON.stringify(qcmDto)}`);
  }

  presentError(message: string): void {
    console.log(message);
  }
}
