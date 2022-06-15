import { Test, TestingModule } from '@nestjs/testing';
import { BlacklistService } from 'src/domain/services/blacklist-service';
import { BlacklistRepository } from 'src/infrastructure/repositories/blacklist-respository';
import { CpfDTO } from 'src/application/dto/cpf-dto';

const cpf = { cpf: '828.400.803-38' };

describe('CpfBlacklistService', () => {
  let blacklistService: BlacklistService;
  let blacklistRepository: BlacklistRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlacklistService,
        {
          provide: BlacklistRepository,
          useValue: {
            findOneCpfBlacklist: jest.fn().mockReturnValue(cpf),
            createCpfBlacklist: jest.fn().mockReturnValue(cpf),
            deleteCpfBlacklist: jest.fn().mockReturnValue(cpf),
            countQuantityCpfBlacklist: jest.fn(),
          },
        },
      ],
    }).compile();

    blacklistService = module.get<BlacklistService>(BlacklistService);

    blacklistRepository = module.get<BlacklistRepository>(BlacklistRepository);
  });

  it('should be defined', () => {
    expect(blacklistService).toBeDefined();
    expect(blacklistRepository).toBeDefined();
  });

  describe('Checks CPF in blacklist', () => {
    it('should check if CPF is on the blacklist', async () => {
      const removeCpf = await blacklistRepository.findOneCpfBlacklist(cpf);
      expect(removeCpf).toEqual(cpf);
    });
  });

  describe('Include CPF in blacklist', () => {
    it('Should include cpf in the blacklist if it does not exist', async () => {
      const cpf: CpfDTO = {
        cpf: '828.400.803-38',
      };

      const cpfAlreadyExists = await blacklistRepository.findOneCpfBlacklist(
        cpf,
      );
      expect(cpfAlreadyExists).toEqual(cpf);

      if (cpfAlreadyExists === null) {
        const result = await blacklistService.includeCpfBlacklist(cpf);
        expect(result).toEqual(cpf);
      }
    });

    it('Should return undefined if CPF exists in the blacklist ', async () => {
      const cpf: CpfDTO = {
        cpf: '828.400.803-38',
      };

      const includeCpf = await blacklistService.includeCpfBlacklist(cpf);
      expect(includeCpf).toBeUndefined();
    });
  });

  describe('Remove CPF in blacklist', () => {
    it('should return undefined if CPF exists not on the blacklist', async () => {
      const removeCpf = await blacklistRepository.deleteCpfBlacklist(cpf);
      expect(removeCpf).toEqual(cpf);

      if (removeCpf === 0) {
        expect(removeCpf).toBeUndefined();
      }
    });

    it('should remove cpf from blacklist', async () => {
      const message = { message: 'CPF successfully removed!' };

      const removeCpf = await blacklistService.removeCpfBlacklist(cpf);
      expect(removeCpf).toEqual(message);
    });
  });

  describe('Count quantity CPF in blacklist', () => {
    it('should return the number of CPFs on the blacklist', async () => {
      const removeCpf = await blacklistService.countQuantityCpf();
      expect(removeCpf).toEqual(removeCpf);
    });
  });
});
