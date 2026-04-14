import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuthAccessToken } from './oauth-access-token.entity';
import { Repository } from 'typeorm';
import { CreateAccessTokenDto } from './dtos/create.auth-token.dto';

@Injectable()
export class OauthAccessTokensService {
  constructor(
    @InjectRepository(OAuthAccessToken)
    private oauthAccessTokenRepository: Repository<OAuthAccessToken>,
  ) {}

  saveAccessToken(createAccessTokenDto: CreateAccessTokenDto) {
    const accessToken =
      this.oauthAccessTokenRepository.create(createAccessTokenDto);

    return this.oauthAccessTokenRepository.save(accessToken);
  }
}
