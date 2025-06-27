import fs, { access } from 'fs/promises';
import path from 'path';
import { QcmRepository } from '../../application/port/qcm-repository.ts';
import { Qcm } from '../../domain/model/qcm.ts';

const filepath = path.resolve('./Katas/QCM', 'qcm.json');

export class FileSystemQcmRepository implements QcmRepository {
  async save(qcm: Qcm): Promise<void> {
    const doesFileExists = await this.doesFileExists(filepath);
    if (!doesFileExists) {
      await fs.writeFile(filepath, JSON.stringify([qcm]));
      return;
    }

    const qcms = await this.retrieveQcms();
    qcms.push(qcm);

    await fs.writeFile(filepath, JSON.stringify(qcms));
  }

  async findById(id: string): Promise<Qcm | null> {
    const qcms = await this.retrieveQcms();
    const qcm = qcms.find((qcm) => qcm.id === id);

    if (!qcm) {
      return null;
    }
    return qcm;
  }

  private async doesFileExists(file: string): Promise<boolean> {
    return await access(file, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }

  private async retrieveQcms(): Promise<Qcm[]> {
    const qcmBufferized = await fs.readFile(filepath);
    return JSON.parse(qcmBufferized.toString());
  }
}
