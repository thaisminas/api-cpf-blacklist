import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlacklistService } from 'src/domain/services/blacklist-service';
import { IncludeCpfBlacklistCommand } from '../command/include-cpf-blacklist-command';

@CommandHandler(IncludeCpfBlacklistCommand)
export class IncludeCpfBlacklistCommandHandler
  implements ICommandHandler<IncludeCpfBlacklistCommand>
{
  constructor(private blacklistService: BlacklistService) {}

  execute(command: IncludeCpfBlacklistCommand) {
    return this.blacklistService.includeCpfBlacklist(command.cpf);
  }
}
