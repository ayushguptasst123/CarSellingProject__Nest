import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  price: number;
}
