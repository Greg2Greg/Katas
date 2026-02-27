import { describe, beforeEach, afterAll, test, expect } from 'vitest';
import path from 'path';
import fs from 'fs/promises';
import { FileSystemQcmRepository } from '../repository/fs-qcm.repository.ts';
import { QcmFactory } from '../../domain/entity/qcm/qcm.factory.ts';
import { StubUuidProvider } from '../../shared/provider/uuid/stub-uuid.provider.ts';
import { qcmDtoBuilder } from '../../application/test/helper/builder/qcm-dto.builder.ts';

describe('File system QCM repository', () => {
  const filepath = path.resolve('./Katas/QCM', 'qcm.integration.test.json');
  let fsQcmRepository: FileSystemQcmRepository;

  beforeEach(async () => {
    const stubUuidProvider = new StubUuidProvider();
    const qcmFactory = new QcmFactory(stubUuidProvider);
    fsQcmRepository = new FileSystemQcmRepository(qcmFactory, filepath);

    await fs.writeFile(filepath, JSON.stringify([]));
  });

  afterAll(() => {
    fs.unlink(filepath);
  });

  test('save() can save QCM', async () => {
    const qcm = qcmDtoBuilder().build();

    await fsQcmRepository.save(qcm);

    /*
        Ne pas tester avec findBy(), qui pourrait causer un
        faux-postitif dû à une erreur symétrique
    */
    const qcmBufferized = await fs.readFile(filepath);
    const qcmDto = JSON.parse(qcmBufferized.toString());
    expect(qcmDto).toEqual([{ id: '', isSubmitted: false, questions: [] }]);
  });

  test('findById() can find an existing QCM', async () => {
    const qcmDto = qcmDtoBuilder().build();
    await fs.writeFile(filepath, JSON.stringify([qcmDto]));

    const qcm = await fsQcmRepository.findById('');

    expect(qcm?.serialize()).toEqual({ id: '', isSubmitted: false, questions: [] });
  });

  test('findById() returns null when no existing QCM', async () => {
    const qcm = await fsQcmRepository.findById('');

    expect(qcm).toBe(null);
  });
});
