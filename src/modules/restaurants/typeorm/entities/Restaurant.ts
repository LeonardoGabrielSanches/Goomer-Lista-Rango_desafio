import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Operation from '../../../operations/typeorm/entities/Operation';

@Entity('restaurants')
class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  image: string;

  @OneToMany(() => Operation, operation => operation.restaurant)
  @JoinColumn()
  operations: Operation[];
}

export default Restaurant;
