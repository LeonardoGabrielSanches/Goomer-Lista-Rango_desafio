import { container } from 'tsyringe';

import OperationsRepository from '../../modules/operations/typeorm/repositories/OperationsRepository';
import IOperationsRepository from '../../modules/operations/repositories/IOperationsRepository';

import RestaurantsRepository from '../../modules/restaurants/typeorm/repositories/RestaurantsRepository';
import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<IOperationsRepository>(
  'OperationsRepository',
  OperationsRepository,
);
