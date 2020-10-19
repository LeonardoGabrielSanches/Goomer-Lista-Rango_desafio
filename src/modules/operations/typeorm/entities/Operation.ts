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
  opening_hour: Date;

  @Column()
  closing_hour: Date;

  @Column()
  days: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}

export default Operation;
