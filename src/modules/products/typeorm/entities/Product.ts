import Category from 'modules/categories/typeorm/entities/Category';
import Operation from 'modules/operations/typeorm/entities/Operation';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
