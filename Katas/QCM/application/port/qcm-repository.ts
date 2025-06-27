import { Qcm } from '../../domain/model/qcm.ts';

export interface QcmRepository {
  save(qcm: Qcm): Promise<void>;
  findById(id: string): Promise<Qcm | null>;
}
