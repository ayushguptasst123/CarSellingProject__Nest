import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    /**
     * 1. Check email in use or not
     * 2. Hash the password
     * 3. Create new user and save it
     * 4. Return the user
     */

    const fetchUser = await this.userService.findByEmail(email);
    if (fetchUser) throw new BadRequestException('Email already in use');

    // This step we make a random salt and convert into hex number
    const salt = randomBytes(8).toString('hex');

    // hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const passwordResult = salt + '.' + hash.toString('hex');
    console.log(passwordResult);

    const user = await this.userService.create(email, passwordResult);
    return user;
  }

  signin() {}
}
