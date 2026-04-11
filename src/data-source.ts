import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME || 'db.sqlite',

  synchronize: false,
  entities: ['src/**/*.entity.ts'],

  migrations: ['src/db/migrations/**/*{.js,.ts}'],

  // optional
  migrationsRun: false,
  //Indicates if migrations should be auto-run on every application launch. Default: false

  //   migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});
