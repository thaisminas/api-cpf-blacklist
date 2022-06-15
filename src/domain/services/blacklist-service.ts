/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import { CpfDTO } from 'src/application/dto/cpf-dto';
import { BlacklistRepository } from 'src/infrastructure/repositories/blacklist-respository';
import { BlacklistEntity } from '../entities/blacklist-entity';

@Injectable()
export class BlacklistService {
  constructor(private blacklistRepository: BlacklistRepository) {}

  async checksCpfBlackList(cpf: CpfDTO): Promise<BlacklistEntity> {
    return await this.blacklistRepository.findOneCpfBlacklist(cpf);
  }

  async includeCpfBlacklist(cpf: CpfDTO) {
    const cpfAlreadyExists = await this.blacklistRepository.findOneCpfBlacklist(
      cpf,
    );

    if (cpfAlreadyExists === null) {
      return await this.blacklistRepository.createCpfBlacklist(cpf);
    }
    return undefined;
  }

  async removeCpfBlacklist(cpf: CpfDTO) {
    const removeCpf = await this.blacklistRepository.deleteCpfBlacklist(cpf);

    if (removeCpf === 0) {
      return undefined;
    }
    return { message: 'CPF successfully removed!' };
  }

  async countQuantityCpf() {
    const quantityCpfBlacklist =
      await this.blacklistRepository.countQuantityCpfBlacklist();
    return { quantity: quantityCpfBlacklist };
  }
}
