import { Provider } from '@nestjs/common';
import { BlacklistService } from 'src/domain/services/blacklist-service';
import { StatusService } from 'src/domain/services/status-service';

export const serviceProviders: Provider[] = [BlacklistService, StatusService];
