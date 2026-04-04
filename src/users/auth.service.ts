import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt } from 'crypto';

const myScrypt = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user.length) {
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
    if (!user.length) {
      throw new BadRequestException('No User Found');
    }

    const hashedPassword = user[0].password;

    const [salt] = hashedPassword.split('.');

    const hash = (await myScrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    if (result === hashedPassword) {
      return 'Success';
    } else {
      return 'failed';
    }
  }
}
/*
this is salt:  65589c798f3b4cfd
This is Hashed password before adding salt:  <Buffer 54 a1 71 0f 06 11 0d 94 3a 23 07 fc f0 1a 5b 15 88 e0 da c4 21 3d 4d 
26 2f aa 54 6f 0c 91 90 28>
Salt + Password  65589c798f3b4cfd.54a1710f06110d943a2307fcf01a5b1588e0dac4213d4d262faa546f0c919028
*/
