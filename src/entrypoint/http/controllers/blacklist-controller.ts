import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IncludeCpfBlacklistCommand } from 'src/application/messaging/command/include-cpf-blacklist-command';
import { RemoveCpfBlacklistCommand } from 'src/application/messaging/command/remove-cpf-blacklist-command';
import { CpfQueryOnBlacklistQuery } from 'src/application/messaging/query/cpf-query-on-blacklist-query ';
import { CpfDTO } from '../../../application/dto/cpf-dto';

@ApiTags('CPF Blacklist')
@Controller('blacklist')
export class BlacklistController {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse({
    status: 201,
    description: 'Created',
  })
  @ApiBadRequestResponse({ status: 400, description: 'CPF Already Exists!' })
  @ApiBody({ type: CpfDTO })
  async includeCpfBlacklist(@Body() cpf: CpfDTO) {
    const includeCpf = await this.commandBus.execute(
      new IncludeCpfBlacklistCommand(cpf),
    );

    if (!includeCpf) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'CPF is already on the blacklist',
      });
    }
    return includeCpf;
  }

  @Get(':cpf')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  checksCpfBlackList(@Param() cpf: CpfDTO) {
    return this.queryBus.execute(new CpfQueryOnBlacklistQuery(cpf));
  }

  @Delete(':cpf')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'CPF successfully removed!',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'CPF does not exist on the blacklist!',
  })
  async removeCpfBlacklist(@Param() cpf: CpfDTO) {
    const removeCpf = await this.commandBus.execute(
      new RemoveCpfBlacklistCommand(cpf),
    );

    if (!removeCpf) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'CPF does not exist on the blacklist!',
      });
    }

    return removeCpf;
  }
}
