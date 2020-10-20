import { container } from 'tsyringe';

import IOperationsRepository from '../../modules/operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../../modules/restaurants/repositories/IRestaurantsRepository';
import ICategoriesRepository from '../../modules/categories/repositories/ICategoriesRepository';
import IProductsRepository from '../../modules/products/repositories/IProductsRepository';

import RestaurantsRepository from '../../modules/restaurants/typeorm/repositories/RestaurantsRepository';
import OperationsRepository from '../../modules/operations/typeorm/repositories/OperationsRepository';
import CategoriesRepository from '../../modules/categories/typeorm/repositories/CategoriesRepository';
import ProductsRepository from '../../modules/products/typeorm/repositories/ProductsRepository';

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

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
