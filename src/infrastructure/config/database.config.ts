import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'cocos_challenge',
  entities: [__dirname + '/../../domain/entities/*.entity{.ts,.js}'],
  synchronize: true, 
  migrationsRun: false, 
  logging: process.env.DATABASE_LOGGING === 'true',
  ssl: { rejectUnauthorized: false },
}));
