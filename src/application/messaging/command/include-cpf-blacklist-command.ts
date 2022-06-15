import { CpfDTO } from 'src/application/dto/cpf-dto';

export class IncludeCpfBlacklistCommand {
  constructor(public cpf: CpfDTO) {}
}
