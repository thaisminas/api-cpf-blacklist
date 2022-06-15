import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class StatusEntity extends Model {
  @Column
  consult: Date;
}
