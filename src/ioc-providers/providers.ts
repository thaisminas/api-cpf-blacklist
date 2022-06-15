import { BlacklistEntity } from '../domain/entities/blacklist-entity';
import { StatusEntity } from '../domain/entities/status-entity';

export const providers = [
  {
    provide: 'BLACKLIST_REPOSITORY',
    useValue: BlacklistEntity,
  },
  {
    provide: 'STATUS_REPOSITORY',
    useValue: StatusEntity,
  },
];
