import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    // This execute the Hooks
    const user = this.repo.create({ email, password });
    const fetchedUser = await this.repo.save(user);
    return fetchedUser;

    /*
    This works, but it doesn’t fix the bug since lifecycle hooks are not executed

    return this.repo.save({ email, password });

    */
  }

  async findOne(id: number) {
    // return this.repo.findOneBy({ id });
    const user = await this.repo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('Not Found');
    return user;
  }

  find(email: string) {
    return this.repo.find({ where: { email } });
  }

  // Partial<> is used to make field optional in this case `User` and assign to attributes
  async update(id: number, attributes: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  //Remove is designed to work with an entity.
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User Not Found');
    }
    return this.repo.remove(user);
  }

  // Delete is designed to work with just a plain ID or some kind of search criteria.
  async delete(email: string) {
    const user = await this.repo.delete({ email });
    // const user = await this.repo.delete({ id: Between(10, 20) });
    // const user = await this.repo.delete(email);
    console.log(user, email);
    return user;
  }
}
