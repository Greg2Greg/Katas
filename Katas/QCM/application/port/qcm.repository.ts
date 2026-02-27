import { QcmDto } from '../../domain/entity/qcm/qcm-type.ts';
import { Qcm } from '../../domain/entity/qcm/qcm.entity.ts';

export interface QcmRepository {
  save(qcmDto: QcmDto): Promise<void>;
  findById(id: string): Promise<Qcm | null>;
}
