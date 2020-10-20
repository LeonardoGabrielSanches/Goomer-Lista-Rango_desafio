import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from '../../../products/typeorm/entities/Product';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product, product => product.category)
  @JoinColumn()
  products: Product[];
}

export default Category;
