import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Product from '../../../products/typeorm/entities/Product';
import Restaurant from '../../../restaurants/typeorm/entities/Restaurant';

@Entity('operations')
class Operation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  start_hour: string;

  @Column()
  end_hour: string;

  @Column()
  period_description: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default Operation;
