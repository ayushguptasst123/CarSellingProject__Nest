import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({
      email,
      password,
    });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const user = await this.repo.findOneBy({ id });
    if (!user)
      throw new NotFoundException(`User with user-id: ${id} not found`);
    console.log(user);
    return user;
  }

  async find() {
    const user = await this.repo.find();
    console.log(user);
    return user;
  }

  udapte() {}

  remove() {}
}
