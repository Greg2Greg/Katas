import { Qcm } from '../../domain/model/qcm.ts';

export interface CreateQcmPresenter {
  present(qcm: Qcm): void;
  presentError(): void;
}
