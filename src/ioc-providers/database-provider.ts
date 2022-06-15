import { Sequelize } from 'sequelize-typescript';
import { BlacklistEntity } from 'src/domain/entities/blacklist-entity';
import { StatusEntity } from 'src/domain/entities/status-entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'database',
        port: 5432,
        username: 'root',
        password: 'password',
        database: 'cpf_blacklist',
      });
      sequelize.addModels([BlacklistEntity, StatusEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];