import ICreateRestaurantDTO from '../dtos/ICreateRestaurantDTO';
import Restaurant from '../typeorm/entities/Restaurant';

interface IRestaurantsRepository {
  create(data: ICreateRestaurantDTO): Promise<Restaurant>;
  getAll(): Promise<Restaurant[]>;
  getById(id: number): Promise<Restaurant | undefined>;
  update(restaurant: Restaurant): Promise<Restaurant>;
  delete(id: number): Promise<void>;
}

export default IRestaurantsRepository;
