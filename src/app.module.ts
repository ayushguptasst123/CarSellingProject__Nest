import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Report } from './reports/report.entity';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true, // Give access of `.env` to all file present in this project

      // npm install cross-env
      envFilePath: `.env.${process.env.NODE_ENV}`,
      // If we are in development evn then `NODE_ENV` point to development
      // If we are in test evn then `NODE_ENV` point to test
    }),

    // Use ConfigService through the DI
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      // Below line is DI part
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
        };
      },
    }),

    /*==== NOTICE THE `ASYNC`/* ====
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
  */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(`.env.${process.env.NODE_ENV}`);
  }
}
