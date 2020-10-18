import Restaurant from 'modules/restaurants/typeorm/entities/Restaurant';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
  @Column({ name: 'restaurant_id' })
  restaurant: Restaurant;
}

export default Operation;
