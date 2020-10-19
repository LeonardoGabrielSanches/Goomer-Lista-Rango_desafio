import { getRepository, Repository } from 'typeorm';

import ICreateRestaurantDTO from '../../dtos/ICreateRestaurantDTO';
import IRestaurantsRepository from '../../repositories/IRestaurantsRepository';

import Restaurant from '../entities/Restaurant';

class RestaurantsRepository implements IRestaurantsRepository {
  private ormRepository: Repository<Restaurant>;

  constructor() {
    this.ormRepository = getRepository(Restaurant);
  }

  public async create(data: ICreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = this.ormRepository.create({
      name: data.name,
      address: data.address,
    });

    await this.ormRepository.save(restaurant);

    return restaurant;
  }

  public async getAll(): Promise<Restaurant[]> {
    return this.ormRepository.find();
  }

  public async getById(id: number): Promise<Restaurant | undefined> {
    return this.ormRepository.findOne({ id });
  }

  public async update(restaurant: Restaurant): Promise<Restaurant> {
    await this.ormRepository.save(restaurant);

    return restaurant;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default RestaurantsRepository;
