import { RequestDetailsQueryHandler } from './request-details-query-handler';
import { CpfQueryOnBlacklistQueryHandler } from './cpf-query-on-blacklist-query-handler';

export const QueryHandlers = [
  CpfQueryOnBlacklistQueryHandler,
  RequestDetailsQueryHandler,
];
