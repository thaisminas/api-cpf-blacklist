import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from 'src/application/messaging/command-handler';
import { QueryHandlers } from 'src/application/messaging/query-handler';
import { BlacklistRepository } from 'src/infrastructure/repositories/blacklist-respository';
import { StatusRepository } from 'src/infrastructure/repositories/status-respository';
import {
  databaseProviders,
  providers
} from 'src/ioc-providers';
import { serviceProviders } from './../ioc-providers/service-provider';
import { BlacklistController } from './http/controllers/blacklist-controller';
import { StatusController } from './http/controllers/status-controller';
import { ValidationCpfMiddleware } from './http/middlewares/validation-cpf-middleware';

@Module({
  imports: [ConfigModule.forRoot(), CqrsModule],
  controllers: [BlacklistController, StatusController],
  providers: [
    ...databaseProviders,
    ...serviceProviders,
    ...CommandHandlers,
    ...QueryHandlers,
    ...providers,
    BlacklistRepository,
    StatusRepository,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationCpfMiddleware)
      .exclude({ path: 'status', method: RequestMethod.GET }, 'status/(.*)')
      .forRoutes('*');
  }
}
