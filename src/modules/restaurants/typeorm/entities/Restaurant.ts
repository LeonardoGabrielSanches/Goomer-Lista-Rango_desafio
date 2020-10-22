import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';

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

  @Expose({ name: 'imageUrl' })
  getImage(): string {
    return `http://localhost:3333/uploads/${this.image}`;
  }
}

export default Restaurant;
