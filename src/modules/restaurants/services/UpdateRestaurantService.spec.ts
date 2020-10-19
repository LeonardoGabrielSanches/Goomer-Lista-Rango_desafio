import { addMinutes } from 'date-fns';

import OperationsRepository from '../../operations/repositories/fakes/OperationsRepository';
import RestaurantRepository from '../repositories/fakes/RestaurantsRepository';

import UpdateRestaurantService from './UpdateRestaurantService';

describe('UpdateRestaurantService', () => {
  it('should be able to update a restaurant', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const date = new Date();

    const operation = await operationsRepository.create({
      opening_hour: date,
      closing_hour: addMinutes(date, 20),
      days: '0|1|2',
    });

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
      image: 'image',
      operations: [operation],
    });

    const updateRestaurant = new UpdateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    const updatedRestaurant = await updateRestaurant.execute({
      id: restaurant.id,
      name: 'Number two Restaurant',
      address: restaurant.address,
      image: restaurant.image,
      operations: [operation],
    });

    expect(updatedRestaurant).toEqual({
      id: 1,
      name: 'Number two Restaurant',
      address: '8th Ave 541',
      image: 'image',
      operations: [
        {
          id: 1,
          opening_hour: date,
          closing_hour: addMinutes(date, 20),
          days: '0|1|2',
        },
      ],
    });
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
        image: 'image',
        operations: [],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a restaurant without a operation date', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const date = new Date();

    const operation = await operationsRepository.create({
      opening_hour: date,
      closing_hour: addMinutes(date, 20),
      days: '0|1|2',
    });

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
      image: 'image',
      operations: [operation],
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
        image: restaurant.image,
        operations: [],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a restaurant with a invalid work period', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const date = new Date();

    const operation = await operationsRepository.create({
      opening_hour: date,
      closing_hour: addMinutes(date, 20),
      days: '0|1|2',
    });

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
      image: 'image',
      operations: [operation],
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
        image: restaurant.image,
        operations: [
          {
            id: operation.id,
            opening_hour: addMinutes(date, -10),
            closing_hour: date,
            days: '3|4|5|6',
            restaurant,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
