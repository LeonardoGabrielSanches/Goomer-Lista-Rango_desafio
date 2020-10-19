import { container } from 'tsyringe';

import OperationsRepository from '../../modules/operations/repositories/fakes/OperationsRepository';
import IOperationsRepository from '../../modules/operations/repositories/IOperationsRepository';

import RestaurantRepository from '../../modules/restaurants/repositories/fakes/RestaurantsRepository';
import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantRepository,
);

container.registerSingleton<IOperationsRepository>(
  'OperationsRepository',
  OperationsRepository,
);
