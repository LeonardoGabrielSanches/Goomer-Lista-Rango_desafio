import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Restaurant from '../../../restaurants/typeorm/entities/Restaurant';

@Entity('operations')
class Operation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  opening_hour: string;

  @Column()
  closing_hour: string;

  @Column()
  days: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}

export default Operation;
