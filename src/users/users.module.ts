import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtGuard } from 'src/guards/jwt.guard';
import { PassportModule } from '@nestjs/passport';
import { PassportAuthController } from './passport-auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.stratergy';
import { User } from './entities/user.entity';
import { OauthAccessTokensModule } from 'src/oauth-access-tokens/oauth-access-tokens.module';
import { StringValue } from 'ms';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    /*  
   JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    */
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (configService.getOrThrow<string>('JWT_EXPIRY') ||
            '6m') as StringValue,
        },
      }),
    }),
    PassportModule,
    OauthAccessTokensModule,
  ],
  controllers: [UsersController, PassportAuthController],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtGuard,
    // Set globally Scoped Interceptor
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // },
  ],
})
// Config the Middleware
export class UsersModule {
  constructor() {
    console.log(process.env.JWT_SECRET);
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
    // .forRoutes({ path: '*', method: RequestMethod.POST });
  }
}
