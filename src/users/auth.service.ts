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

    // Generate Hash password
    const hash = (await myScrypt(password, salt, 32)) as Buffer;

    // Create hashedPassword + salt
    const result = salt + '.' + hash.toString('hex');

    return await this.userService.create(email, result);
  }

  signIn() {}
}
