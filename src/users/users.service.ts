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

  async findByEmail(email: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user)
      throw new NotFoundException(`User with user-id: ${email} not found`);
    console.log(user);
    return user;
  }

  async find() {
    const user = await this.repo.find();
    console.log(user);
    return user;
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user)
      throw new NotFoundException(`User with user-id: ${id} not found`);

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  /**
   * remove(Entity) : It take entity to delete
   * delete(id)     : It take id to delete the data from db
   * -> side effect of delete(id) is it can't invoke hooks
   */
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user)
      throw new NotFoundException(`User with user-id: ${id} not found`);

    return this.repo.remove(user);
  }
}
