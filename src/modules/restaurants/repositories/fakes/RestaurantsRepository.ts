import ICreateRestaurantDTO from '../../dtos/ICreateRestaurantDTO';
import Restaurant from '../../typeorm/entities/Restaurant';

import IRestaurantsRepository from '../IRestaurantsRepository';

class RestaurantRepository implements IRestaurantsRepository {
  private restaurants: Restaurant[] = [];

  private uniqueId = 1;

  public async create(data: ICreateRestaurantDTO): Promise<Restaurant> {
    const restaurant = new Restaurant();

    Object.assign(restaurant, { id: this.uniqueId }, data);

    this.restaurants.push(restaurant);

    return restaurant;
  }

  public async getAll(): Promise<Restaurant[]> {
    return this.restaurants;
  }

  public async getById(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.find(restaurant => restaurant.id === id);
  }

  public async update(restaurant: Restaurant): Promise<Restaurant> {
    const findIndex = this.restaurants.findIndex(
      restaurantFind => restaurantFind.id === restaurant.id,
    );

    this.restaurants[findIndex] = restaurant;

    return restaurant;
  }

  public async delete(id: number): Promise<void> {
    this.restaurants = this.restaurants.filter(
      restaurant => restaurant.id !== id,
    );
  }
}

export default RestaurantRepository;
