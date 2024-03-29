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

    const restaurant = await createRestaurant.execute({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
      operations: [
        {
          start_hour: '17:30',
          end_hour: '18:50',
          period_description: 'Segunda à Sexta',
        },
        {
          start_hour: '17:30',
          end_hour: '17:45',
          period_description: 'Domingos e feriados',
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

    expect(
      createRestaurant.execute({
        name: 'Number One Restaurant',
        address: '8th Ave 541',
        operations: [
          {
            start_hour: '17:30',
            end_hour: '17:20',
            period_description: 'Segunda à Sexta',
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

    expect(
      createRestaurant.execute({
        name: 'Number One Restaurant',
        address: '8th Ave 541',
        operations: [
          {
            start_hour: '17:30',
            end_hour: '17:35',
            period_description: 'Segunda à Sexta',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
