import 'dotenv/config';
import { DataSource } from 'typeorm';
import * as process from 'process';
import * as path from 'path';

// This is meant to be used with TypeORM CLI
export const datasource = new DataSource({
  type: process.env.DATABASE_DRIVER as 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.join(__dirname, 'domainmodel/*.ts')],
  migrations: [path.join(__dirname, '../migrations/*')],
});
