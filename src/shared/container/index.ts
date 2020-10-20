import { container } from 'tsyringe';

import IOperationsRepository from '../../modules/operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';
import ICategoriesRepository from '../../modules/categories/repositories/ICategoriesRepository';

import RestaurantsRepository from '../../modules/restaurants/typeorm/repositories/RestaurantsRepository';
import OperationsRepository from '../../modules/operations/typeorm/repositories/OperationsRepository';
import CategoriesRepository from '../../modules/categories/typeorm/repositories/CategoriesRepository';

container.registerSingleton<IRestaurantsRepository>(
  'RestaurantsRepository',
  RestaurantsRepository,
);

container.registerSingleton<IOperationsRepository>(
  'OperationsRepository',
  OperationsRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);
