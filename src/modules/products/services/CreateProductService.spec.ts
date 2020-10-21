import ProductsRepository from '../repositories/fakes/ProductsRepository';
import OperationsRepository from '../../operations/repositories/fakes/OperationsRepository';
import RestaurantsRepository from '../../restaurants/repositories/fakes/RestaurantsRepository';
import CategoriesRepository from '../../categories/repositories/fakes/CategoriesRepository';

import CreateProductService from './CreateProductService';

describe('CreateProductService', () => {
  it('should be able to create a new product without discount', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const product = await createProduct.execute({
      name: 'Bread',
      category: 'Dry Food',
      price: 5.5,
      sale: false,
      restaurant_id: restaurant.id,
    });

    expect(product).toHaveProperty('id');
  });

  it('should be able to create a new product with discount', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const product = await createProduct.execute({
      name: 'Bread',
      category: 'Dry Food',
      price: 5.5,
      sale: false,
      restaurant_id: restaurant.id,
      sale_price: 2.5,
      sale_description: 'HAPPY HOUR',
      operations: [
        {
          start_hour: '17:30',
          end_hour: '18:30',
          period_description: 'Segunda a sexta',
        },
      ],
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a new product with discount', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    expect(
      createProduct.execute({
        name: 'Bread',
        category: 'Dry Food',
        price: 5.5,
        sale: true,
        restaurant_id: restaurant.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new product with discount and invalid date', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    expect(
      createProduct.execute({
        name: 'Bread',
        category: 'Dry Food',
        price: 5.5,
        sale: true,
        operations: [
          {
            start_hour: '17:30',
            end_hour: '17:20',
            period_description: 'Segunda à Sexta',
          },
        ],
        sale_price: 3.5,
        sale_description: 'Lightining',
        restaurant_id: restaurant.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a new product without a valid restaurant', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const createProduct = new CreateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    expect(
      createProduct.execute({
        name: 'Bread',
        category: 'Dry Food',
        price: 5.5,
        sale: false,
        restaurant_id: 5,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
