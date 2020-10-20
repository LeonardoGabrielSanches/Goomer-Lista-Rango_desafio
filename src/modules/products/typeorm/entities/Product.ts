import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Operation from '../../../operations/typeorm/entities/Operation';
import Category from '../../../categories/typeorm/entities/Category';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn()
  category: Category;

  @Column()
  promotion: boolean;

  @Column()
  promotion_price: number;

  @OneToOne(() => Operation)
  @JoinColumn({ name: 'promotion_operation' })
  promotion_operation: Operation;

  @Column()
  image: string;
}

export default Product;
