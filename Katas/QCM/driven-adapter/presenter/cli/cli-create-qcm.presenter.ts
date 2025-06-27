import { CreateQcmPresenter } from '../../../application/port/create-qcm-presenter.ts';
import { Qcm } from '../../../domain/model/qcm.ts';

export class CliCreateQcmPresenter implements CreateQcmPresenter {
  present(qcm: Qcm): void {
    console.log(`QCM Created: ${qcm}`);
  }

  presentError(): void {
    console.log('Error: qcm has not been created');
  }
}
