import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceOptions } from './database/data-source';
import { VehiclesModule } from './vehicles/vehicles.module';
import { OauthAccessTokensModule } from './oauth-access-tokens/oauth-access-tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Give access of `.env` to all file present in this project

      // npm install cross-env
      envFilePath: `.env.${process.env.NODE_ENV}`,
      // If we are in development evn then `NODE_ENV` point to development
      // If we are in test evn then `NODE_ENV` point to test
    }),

    UsersModule,
    ReportsModule,

    // Use ConfigService through the DI
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: () =>
        ({
          ...dataSourceOptions,
          autoLoadEntities: true,
        }) as TypeOrmModuleOptions,
    }),

    VehiclesModule,

    OauthAccessTokensModule,

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
