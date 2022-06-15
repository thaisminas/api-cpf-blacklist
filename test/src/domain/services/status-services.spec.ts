import { StatusService } from './../../../../src/domain/services/status-service';
import { BlacklistRepository } from 'src/infrastructure/repositories/blacklist-respository';
import { CpfDTO } from 'src/application/dto/cpf-dto';
import { StatusRepository } from 'src/infrastructure/repositories/status-respository';
import { Test, TestingModule } from '@nestjs/testing';

const cpf = { cpf: '828.400.803-38' };
const typeConsut = 0;


describe('StatusService', () => {
  let statusService: StatusService;
  let statusRepository: StatusRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatusService,
        {
          provide: StatusRepository,
          useValue: {
            addConsult: jest.fn(),
            consultQuantityCpfLastRequest: jest
              .fn()
              .mockReturnValue(typeConsut),
            checkTime: jest.fn().mockReturnValue(cpf),
            serverRuntime: jest.fn(),
            countConsultQuantityLastRestart: jest
              .fn()
              .mockReturnValue(typeConsut),
            addQuery: jest.fn().mockReturnValue(cpf),
          },
        },
      ],
    }).compile();

    statusService = module.get<StatusService>(StatusService);

    statusRepository = module.get<StatusRepository>(StatusRepository);
  });

  it('should be defined', () => {
    expect(statusService).toBeDefined();
    expect(statusRepository).toBeDefined();
  });

  describe('Checks time', () => {
    it('should check the time and format', async () => {
      const time = '55';
      const removeCpf = await statusService.checkTime(time);
      expect(removeCpf).toEqual(time);
    });
  });

  describe('Count consult quantity Last restart', () => {
    it('Should return the number of queries since last restart', async () => {
      const quantity = 1;
      const countConsult = await statusService.countConsultQuantityLastRestart(
        typeConsut,
      );
      expect(countConsult).toBe(quantity);
    });
  });

  describe('Add query', () => {
    it('should add query date in database', async () => {
      const countConsult = await statusService.addQuery();
      expect(countConsult).toBeUndefined;
    });
  });
});
