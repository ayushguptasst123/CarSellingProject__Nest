import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Gender {
  MALE,
  FEMALE,
  TRANS,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'MALE' })
  gender: Gender;

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
