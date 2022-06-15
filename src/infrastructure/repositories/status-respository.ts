import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { StatusEntity } from 'src/domain/entities/status-entity';

@Injectable()
export class StatusRepository {
  constructor(
    @Inject('STATUS_REPOSITORY')
    private statusRepository: typeof StatusEntity,
  ) {}

  async addConsult(): Promise<StatusEntity> {
    const date = Date.now();
    return await this.statusRepository.create({ consult: date });
  }

  async countConsultCpfs(): Promise<number> {
    return await this.statusRepository.count({
      attributes: [[sequelize.fn('COUNT', 0), 'count']],
    });
  }
}
