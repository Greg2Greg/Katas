import { QcmDto } from '../../domain/entity/qcm/qcm-type.ts';

export interface CreateQcmPresenter {
  present(qcmDto: QcmDto): void;
  presentError(message: string): void;
}
