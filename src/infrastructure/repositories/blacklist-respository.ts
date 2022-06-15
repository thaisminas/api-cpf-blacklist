import { Inject, Injectable } from '@nestjs/common';
import sequelize from 'sequelize';
import { CpfDTO } from 'src/application/dto/cpf-dto';
import { BlacklistEntity } from 'src/domain/entities/blacklist-entity';

@Injectable()
export class BlacklistRepository {
  constructor(
    @Inject('BLACKLIST_REPOSITORY')
    private blacklistRepository: typeof BlacklistEntity,
  ) {}

  async createCpfBlacklist(cpf: CpfDTO): Promise<BlacklistEntity> {
    return await this.blacklistRepository.create({ cpf: cpf.cpf });
  }

  async findOneCpfBlacklist(cpf: CpfDTO): Promise<BlacklistEntity>{
    return await this.blacklistRepository.findOne({
      where: {
        cpf: cpf.cpf,
      },
    });
  }

  async deleteCpfBlacklist(cpf: CpfDTO): Promise<number> {
    return await this.blacklistRepository.destroy({
      where: {
        cpf: cpf.cpf,
      },
    });
  }

  async countQuantityCpfBlacklist(): Promise<number> {
    return await this.blacklistRepository.count({
      attributes: [[sequelize.fn('COUNT', 0), 'count']],
    });
  }
}
