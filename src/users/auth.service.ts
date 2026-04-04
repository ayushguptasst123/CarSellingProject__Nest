import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: number) {
    const user = await this.userService.find(email);
    if (user.length) {
      throw new BadRequestException('Email in use');
    }
  }

  signIn() {}
}
