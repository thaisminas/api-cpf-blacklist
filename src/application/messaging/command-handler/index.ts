import { IncludeCpfBlacklistCommandHandler } from './include-cpf-blacklist-command-handler';
import { RemoveCpfBlacklistCommandHandler } from './remove-cpf-blacklist-command-handler';

export const CommandHandlers = [
  RemoveCpfBlacklistCommandHandler,
  IncludeCpfBlacklistCommandHandler,
];
