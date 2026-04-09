import { Report } from 'src/reports/report.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @BeforeInsert()
  logBeforeInsert() {
    console.log(`Before Inserted password is ${this.password} `);
  }

  @AfterInsert()
  logInsert() {
    console.log(`After Inserted password is ${this.password} `);
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
