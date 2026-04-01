import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  Column,
  CreateDateColumn,
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
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User with id: ${this.id}`);
  }

  @BeforeInsert()
  logBeforeInsert() {
    console.log(`Before Inserted User `);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Update User with id: ${this.id}`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`Removed User with id: ${this.id}`);
  }
}
