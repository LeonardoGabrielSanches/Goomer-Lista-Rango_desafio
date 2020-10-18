import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default Restaurant;
