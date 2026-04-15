import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt } from 'crypto';
import { OauthAccessTokensService } from 'src/oauth-access-tokens/oauth-access-tokens.service';

const myScrypt = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private oauthAccessTokensService: OauthAccessTokensService,
  ) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user) {
      throw new BadRequestException('Email in use');
    }

    // Generating salt
    const salt = randomBytes(8).toString('hex');
    console.log('this is salt: ', salt);

    // Generate Hash password
    const hash = (await myScrypt(password, salt, 32)) as Buffer;
    console.log('This is Hashed password before adding salt: ', hash);

    // Create  + salt + hashedPassword
    const result = salt + '.' + hash.toString('hex');
    console.log('Salt + Password ', result);

    return await this.userService.create(email, result);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('No User Found');
    }

    const hashedPassword = user.password;

    const [salt, storedHash] = hashedPassword.split('.');

    const hash = (await myScrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Invalid Credentials');

    // const accessTokenDto = new CreateAccessTokenDto();
    // accessToken.user = user;
    const accessToken =
      await this.oauthAccessTokensService.generateJwtToken(user);

    return {
      accessToken,
      ...user,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.find(email);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const hashedPassword = user.password;

    const [salt, storedHash] = hashedPassword.split('.');

    const hash = (await myScrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Invalid Credentials');

    return user;
  }
}
