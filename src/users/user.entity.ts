import { Exclude } from 'class-transformer';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  // This is hook decorator
  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with id: ${this.id} is updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`User with id: ${this.id} is removed Successfully`);
  }
}
