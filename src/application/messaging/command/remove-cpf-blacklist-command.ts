import { CpfDTO } from 'src/application/dto/cpf-dto';

export class RemoveCpfBlacklistCommand {
  constructor(public cpf: CpfDTO) {}
}
