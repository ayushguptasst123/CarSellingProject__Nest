import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuthAccessToken } from './oauth-access-token.entity';
import { Repository } from 'typeorm';
import { CreateAccessTokenDto } from './dtos/create-auth-token.dto';
import { User } from 'src/users/entities/user.entity';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import ms, { StringValue } from 'ms';

@Injectable()
export class OauthAccessTokensService {
  constructor(
    @InjectRepository(OAuthAccessToken)
    private repo: Repository<OAuthAccessToken>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  saveAccessToken(createAccessTokenDto: CreateAccessTokenDto) {
    const accessToken = this.repo.create(createAccessTokenDto);

    return this.repo.save(accessToken);
  }

  async generateJwtToken(user: User) {
    const tokenId = randomUUID();
    const expiresTime = this.configService.getOrThrow<string>(
      'JWT_EXPIRY',
    ) as StringValue;
    const expiresAt = new Date(Date.now() + ms(expiresTime));

    const createAccessTokenDto: CreateAccessTokenDto = {
      user,
      tokenId,
      expiresAt,
    };

    // Save access token to database
    await this.saveAccessToken(createAccessTokenDto);

    const tokenPayload = {
      sub: user.id,
      tokenId,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return accessToken;
  }

  async findTokenById(tokenId: string) {
    return await this.repo.findOne({
      where: { tokenId },
      relations: {
        user: true,
      },
    });
  }

  async verifyToken(tokenId: string) {
    const token = await this.findTokenById(tokenId);
    if (token?.revoked) throw new UnauthorizedException();
    if (!token || token.expiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException();
    }
    return token.tokenId;
  }

  async disableToken(tokenId: string, user: User) {
    const token = await this.findTokenById(tokenId);
    if (!token) throw new UnauthorizedException();
    if (token.user.id !== user.id) throw new UnauthorizedException();
    token.revoked = true;
    token.revokedAt = new Date();
    return this.repo.save(token);
  }
}
