import { RequestDetailsQuery } from './../../../application/messaging/query/request-details-query';
import { Controller, Get, HttpCode } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Status')
@ApiResponse({
  status: 200,
  description: 'OK',
})
@Controller('status')
export class StatusController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  async details() {
    return await this.queryBus.execute(new RequestDetailsQuery());
  }
}
