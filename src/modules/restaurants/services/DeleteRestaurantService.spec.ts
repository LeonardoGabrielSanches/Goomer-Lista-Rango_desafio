import RestaurantRepository from '../repositories/fakes/RestaurantsRepository';

import DeleteRestaurantService from './DeleteRestaurantService';

describe('DeleteRestaurantService', () => {
  it('should be able to delete a restaurant', async () => {
    const restaurantsRepository = new RestaurantRepository();

    const restaurant = await restaurantsRepository.create({
      name: 'Restaurant 1',
      address: '8th Avenue',
    });

    const deleteRestaurantService = new DeleteRestaurantService(
      restaurantsRepository,
    );

    expect(
      deleteRestaurantService.execute(restaurant.id),
    ).resolves.not.toThrow();
  });
});
