import fs, { access } from 'fs/promises';
import { QcmRepository } from '../../application/port/qcm.repository.ts';
import { QcmFactory } from '../../domain/entity/qcm/qcm.factory.ts';
import { QcmDto } from '../../domain/entity/qcm/qcm-type.ts';
import { Qcm } from '../../domain/entity/qcm/qcm.entity.ts';

export class FileSystemQcmRepository implements QcmRepository {
  constructor(
    private readonly qcmFactory: QcmFactory,
    private readonly filepath: string
  ) {}

  async save(qcmDto: QcmDto): Promise<void> {
    const doesFileExists = await this.doesFileExists(this.filepath);
    if (!doesFileExists) {
      await fs.writeFile(this.filepath, JSON.stringify([qcmDto]));
      return;
    }

    const qcms = await this.retrieveQcms();
    qcms.push(qcmDto);

    await fs.writeFile(this.filepath, JSON.stringify(qcms));
  }

  async findById(id: string): Promise<Qcm | null> {
    const qcmsDto = await this.retrieveQcms();
    const qcm = qcmsDto.find((qcm) => qcm.id === id);

    if (!qcm) {
      return null;
    }

    return this.qcmFactory.fromDto(qcm);
  }

  private async doesFileExists(file: string): Promise<boolean> {
    return await access(file, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }

  private async retrieveQcms(): Promise<QcmDto[]> {
    const qcmBufferized = await fs.readFile(this.filepath);
    return JSON.parse(qcmBufferized.toString());
  }
}
