import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(email: string, password: string) {
    // This execute the Hooks
    const user = this.repo.create({ email, password });
    console.log('------- Line Break Here -------');
    return this.repo.save(user);

    /*
    This works, but it doesn’t fix the bug since lifecycle hooks are not executed

    return this.repo.save({ email, password });
    */
  }
}
