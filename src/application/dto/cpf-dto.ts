import { ApiProperty } from '@nestjs/swagger';

export class CpfDTO {
  @ApiProperty({
    example: '828.400.803-38',
  })
  cpf: string;
}
