import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BlacklistService } from 'src/domain/services/blacklist-service';
import { StatusService } from 'src/domain/services/status-service';
import { RequestDetailsQuery } from '../query/request-details-query';

@QueryHandler(RequestDetailsQuery)
export class RequestDetailsQueryHandler
  implements IQueryHandler<RequestDetailsQuery>
{
  constructor(
    private blacklistService: BlacklistService,
    private statusService: StatusService,
  ) {}

  async execute() {
    const quantityCpf = await this.blacklistService.countQuantityCpf();
    const timeServer = this.statusService.serverRuntime();
    const typeConsult = 1;
    const consult =
      this.statusService.countConsultQuantityLastRestart(typeConsult);
    return {
      uptime_server: timeServer,
      quantity_consults: consult,
      quantity_cpf: quantityCpf.quantity,
    };
  }
}
