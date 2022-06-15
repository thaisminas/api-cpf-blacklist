import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class BlacklistEntity extends Model {
  @Column
  cpf: string;
}
