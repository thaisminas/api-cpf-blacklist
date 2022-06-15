import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlacklistService } from 'src/domain/services/blacklist-service';
import { RemoveCpfBlacklistCommand } from '../command/remove-cpf-blacklist-command';

@CommandHandler(RemoveCpfBlacklistCommand)
export class RemoveCpfBlacklistCommandHandler
  implements ICommandHandler<RemoveCpfBlacklistCommand>
{
  constructor(private blacklistService: BlacklistService) {}

  execute(command: RemoveCpfBlacklistCommand) {
    return this.blacklistService.removeCpfBlacklist(command.cpf);
  }
}
