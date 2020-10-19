import { addMinutes } from 'date-fns';

import OperationsRepository from '../../operations/repositories/fakes/OperationsRepository';
import RestaurantRepository from '../repositories/fakes/RestaurantsRepository';

import CreateRestaurantService from './CreateRestaurantService';

describe('CreateRestaurantService', () => {
  it('should be able to create a new restaurant', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const createRestaurant = new CreateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    const date = new Date();

    const restaurant = await createRestaurant.execute({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
      image: 'image',
      operations: [
        {
          opening_hour: date,
          closing_hour: addMinutes(date, 20),
          days: '0|1|2',
        },
        {
          opening_hour: date,
          closing_hour: addMinutes(date, 60),
          days: '3|4|5|6',
        },
      ],
    });

    expect(restaurant).toHaveProperty('id');
  });

  it('should not be able to create a new restaurant without a operation date', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const createRestaurant = new CreateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    expect(
      createRestaurant.execute({
        name: 'Number One Restaurant',
        address: '8th Ave 541',
        image: 'image',
        operations: [],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new restaurant with a invalid date', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const createRestaurant = new CreateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    const date = new Date();

    expect(
      createRestaurant.execute({
        name: 'Number One Restaurant',
        address: '8th Ave 541',
        image: 'image',
        operations: [
          {
            opening_hour: addMinutes(date, -60),
            closing_hour: date,
            days: '3|4|5|6',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new restaurant with invalid work period', async () => {
    const operationsRepository = new OperationsRepository();
    const restaurantsRepository = new RestaurantRepository();

    const createRestaurant = new CreateRestaurantService(
      restaurantsRepository,
      operationsRepository,
    );

    const date = new Date();

    expect(
      createRestaurant.execute({
        name: 'Number One Restaurant',
        address: '8th Ave 541',
        image: 'image',
        operations: [
          {
            opening_hour: date,
            closing_hour: date,
            days: '3|4|5|6',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
