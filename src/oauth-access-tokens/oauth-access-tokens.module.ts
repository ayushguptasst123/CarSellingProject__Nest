import { Module } from '@nestjs/common';
import { OauthAccessTokensService } from './oauth-access-tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OAuthAccessToken } from './oauth-access-token.entity';

@Module({
  providers: [OauthAccessTokensService],
  imports: [TypeOrmModule.forFeature([OAuthAccessToken])],
  exports: [OauthAccessTokensService],
})
export class OauthAccessTokensModule {}
