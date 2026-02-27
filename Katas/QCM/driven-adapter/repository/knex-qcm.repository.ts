import { Knex } from 'knex';
import { QcmRepository } from '../../application/port/qcm.repository.ts';
import { QcmFactory } from '../../domain/entity/qcm/qcm.factory.ts';
import { QcmDto } from '../../domain/entity/qcm/qcm-type.ts';
import { Qcm } from '../../domain/entity/qcm/qcm.entity.ts';

export class KnexQcmRepository implements QcmRepository {
  constructor(
    private readonly db: Knex, // knex instance
    private readonly qcmFactory: QcmFactory,
    private readonly tableName: string = 'qcms' // default table name
  ) {}

  async save(qcmDto: QcmDto): Promise<void> {
    // Try to insert, or update if it exists (assuming 'id' is primary key)
    await this.db(this.tableName)
      .insert(qcmDto)
      .onConflict('id') // only works if 'id' is unique or primary
      .merge();
  }

  async findById(id: string): Promise<Qcm | null> {
    const qcmDto = await this.db<QcmDto>(this.tableName).where({ id }).first();

    if (!qcmDto) {
      return null;
    }

    return this.qcmFactory.fromDto(qcmDto);
  }
}
