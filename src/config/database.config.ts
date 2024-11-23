import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  database: process.env.DB_NAME || 'blockchain',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
};
