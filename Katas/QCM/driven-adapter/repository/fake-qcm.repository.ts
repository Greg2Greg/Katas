import { QcmRepository } from '../../application/port/qcm.repository.ts';
import { QcmFactory } from '../../domain/entity/qcm/qcm.factory.ts';
import { QcmDto } from '../../domain/entity/qcm/qcm-type.ts';
import { Qcm } from '../../domain/entity/qcm/qcm.entity.ts';

export class FakeQcmRepository implements QcmRepository {
  private repo = new Map<string, QcmDto>();

  constructor(private readonly qcmFactory: QcmFactory) {}

  async save(qcmDto: QcmDto): Promise<void> {
    this.repo.set(qcmDto.id, qcmDto);
  }

  async findById(id: string): Promise<Qcm | null> {
    const qcmDto = this.repo.get(id);

    if (!qcmDto) {
      return null;
    }

    return this.qcmFactory.fromDto(qcmDto);
  }
}
