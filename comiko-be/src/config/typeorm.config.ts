import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';
import * as config from 'config';

const dbConfig = config.get('db');

export const TypeOrmConfig: TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,
  entities: [
    resolve(__dirname, '..', '**/*.entity.{js,ts}'),
  ],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
