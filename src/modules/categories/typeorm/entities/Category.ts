import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

export default Category;
