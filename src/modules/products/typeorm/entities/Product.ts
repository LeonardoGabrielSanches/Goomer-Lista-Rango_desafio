import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Category from '../../../categories/typeorm/entities/Category';
import Operation from '../../../operations/typeorm/entities/Operation';
import Restaurant from '../../../restaurants/typeorm/entities/Restaurant';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  sale: boolean;

  @Column()
  sale_description: string;

  @Column()
  sale_price: number;

  @Column()
  image: string;

  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @OneToMany(() => Operation, operation => operation.product)
  @JoinColumn()
  operations: Operation[];
}

export default Product;
