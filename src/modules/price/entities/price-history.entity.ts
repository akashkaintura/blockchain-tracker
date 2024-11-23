import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PriceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chain: string;

  @Column('decimal')
  price: number;

  @Column('timestamp')
  timestamp: Date;
}
