import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BlacklistService } from 'src/domain/services/blacklist-service';
import { StatusService } from 'src/domain/services/status-service';
import { CpfQueryOnBlacklistQuery } from '../query/cpf-query-on-blacklist-query ';

@QueryHandler(CpfQueryOnBlacklistQuery)
export class CpfQueryOnBlacklistQueryHandler
  implements IQueryHandler<CpfQueryOnBlacklistQuery>
{
  constructor(
    private blacklistService: BlacklistService,
    private statusService: StatusService,
  ) {}

  async execute(query: CpfQueryOnBlacklistQuery) {
    const data = await this.blacklistService.checksCpfBlackList(query.cpf);
    const teste = await this.statusService.addQuery();
    const typeConsults = 0;
    this.statusService.countConsultQuantityLastRestart(typeConsults);

    if (data === null) {
      return { status: 'FREE' };
    }
    return { status: 'BLOCK' };
  }
}
