import { QcmRepository } from '../../application/port/qcm-repository.ts';
import { Qcm } from '../../domain/model/qcm.ts';

export class FakeQcmRepository implements QcmRepository {
  private qcm = new Map<string, Qcm>();

  async save(qcm: Qcm): Promise<void> {
    this.qcm.set(qcm.id, qcm);
  }

  async findById(id: string): Promise<Qcm | null> {
    const qcm = this.qcm.get(id);

    if (!qcm) {
      return null;
    }
    return qcm;
  }
}
