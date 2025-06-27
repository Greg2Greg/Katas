import { Qcm } from '../domain/model/qcm.ts';
import { CreateQcmPresenter } from './port/create-qcm-presenter.ts';
import { QcmRepository } from './port/qcm-repository.ts';

export class CreateQcm {
  private readonly qcmRepository: QcmRepository;
  private readonly createQcmPresenter: CreateQcmPresenter;

  constructor(dependencides: { qcmRepository: QcmRepository; createQcmPresenter: CreateQcmPresenter }) {
    this.qcmRepository = dependencides.qcmRepository;
    this.createQcmPresenter = dependencides.createQcmPresenter;
  }

  async execute(input: { qcm: Qcm }) {
    try {
      const { qcm } = input;
      await this.qcmRepository.save(qcm);
      this.createQcmPresenter.present(qcm);
    } catch (e) {
      this.createQcmPresenter.presentError();
    }
  }
}
