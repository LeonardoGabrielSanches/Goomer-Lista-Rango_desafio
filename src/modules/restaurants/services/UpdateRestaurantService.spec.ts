import { parseISO } from 'date-fns';

import OperationsRepository from '../../operations/repositories/fakes/OperationsRepository';
import RestaurantRepository from '../repositories/fakes/RestaurantsRepository';

import UpdateRestaurantService from './UpdateRestaurantService';

describe('UpdateRestaurantService', () => {
  it('should be able to update a restaurant', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const updateRestaurant = new UpdateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    const operation = await operationsRepository.create({
      opening_hour: '17:30',
      closing_hour: '17:50',
      days: 'Segunda à Sexta',
    });

    const updatedRestaurant = await updateRestaurant.execute({
      id: restaurant.id,
      name: 'Number two Restaurant',
      address: restaurant.address,
      operations: [operation],
    });

    expect(updatedRestaurant).toHaveProperty('name', 'Number two Restaurant');
  });

  it('should not be able to update a restaurant that does not exits', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const updateRestaurant = new UpdateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    expect(
      updateRestaurant.execute({
        id: 4,
        name: 'Number two Restaurant',
        address: 'Address 1',
        operations: [],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a restaurant without a operation date', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const updateRestaurant = new UpdateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    expect(
      updateRestaurant.execute({
        id: restaurant.id,
        name: 'Number two Restaurant',
        address: restaurant.address,
        operations: [],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a restaurant with a invalid date', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const operation = await operationsRepository.create({
      opening_hour: '17:30',
      closing_hour: '17:50',
      days: 'Segunda à Sexta',
    });

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const updateRestaurant = new UpdateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    expect(
      updateRestaurant.execute({
        id: restaurant.id,
        name: 'Number One Restaurant',
        address: '8th Ave 541',
        operations: [
          {
            id: operation.id,
            opening_hour: '17:30',
            closing_hour: '17:20',
            days: 'Segunda à Sexta',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a restaurant with a invalid work period', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const operation = await operationsRepository.create({
      opening_hour: '17:30',
      closing_hour: '17:50',
      days: 'Segunda à Sexta',
    });

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const updateRestaurant = new UpdateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    expect(
      updateRestaurant.execute({
        id: restaurant.id,
        name: 'Number two Restaurant',
        address: restaurant.address,
        operations: [
          {
            id: operation.id,
            opening_hour: '17:30',
            closing_hour: '17:35',
            days: 'Segunda à Sexta',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
