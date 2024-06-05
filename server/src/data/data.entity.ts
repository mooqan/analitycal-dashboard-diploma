import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  sales: number;

  @Column()
  revenue: number;

  @Column()
  orders: number;
}
