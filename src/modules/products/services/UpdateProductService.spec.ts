import ProductsRepository from '../repositories/fakes/ProductsRepository';
import OperationsRepository from '../../operations/repositories/fakes/OperationsRepository';
import RestaurantsRepository from '../../restaurants/repositories/fakes/RestaurantsRepository';
import CategoriesRepository from '../../categories/repositories/fakes/CategoriesRepository';

import UpdateProductService from './UpdateProductService';

describe('UpdateProductService', () => {
  it('should be able to update a product without discount', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const updateProduct = new UpdateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const category = await categoriesRepository.create({ name: 'Dry food' });

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const product = await productsRepository.create({
      name: 'Bread',
      category,
      price: 5.5,
      sale: false,
      restaurant,
    });

    const updatedProduct = await updateProduct.execute({
      id: product.id.toString(),
      name: 'Bread',
      category: 'Dry Food',
      price: 2.3,
      sale: false,
      restaurant_id: restaurant.id,
    });

    expect(updatedProduct).toHaveProperty('price', 2.3);
  });

  it('should be able to update a product with discount', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const updateProduct = new UpdateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const category = await categoriesRepository.create({ name: 'Dry food' });

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const product = await productsRepository.create({
      name: 'Bread',
      category,
      price: 5.5,
      sale: false,
      restaurant,
    });

    const operation = await operationsRepository.create({
      start_hour: '17:30',
      end_hour: '18:50',
      period_description: 'Sexta',
      product,
    });

    const updatedProduct = await updateProduct.execute({
      id: product.id.toString(),
      name: 'Bread',
      category: 'Dry Food',
      price: 2.3,
      sale: true,
      restaurant_id: restaurant.id,
      sale_price: 1.25,
      sale_description: 'HAPPY HOUR',
      operations: [
        {
          id: operation.id,
          start_hour: '17:30',
          end_hour: '18:50',
          period_description: 'Sexta',
        },
      ],
    });

    expect(updatedProduct).toHaveProperty('sale', true);
  });

  it('should not be able to update a product with discount', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const updateProduct = new UpdateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const category = await categoriesRepository.create({ name: 'Dry food' });

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const product = await productsRepository.create({
      name: 'Bread',
      category,
      price: 5.5,
      sale: false,
      restaurant,
    });

    expect(
      updateProduct.execute({
        id: product.id.toString(),
        name: 'Bread',
        category: 'Dry Food',
        price: 2.3,
        sale: true,
        restaurant_id: restaurant.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a product with discount and invalid date', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const updateProduct = new UpdateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const category = await categoriesRepository.create({ name: 'Dry food' });

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const product = await productsRepository.create({
      name: 'Bread',
      category,
      price: 5.5,
      sale: false,
      restaurant,
    });

    expect(
      updateProduct.execute({
        id: product.id.toString(),
        name: 'Bread',
        category: 'Dry Food',
        price: 2.3,
        sale: true,
        restaurant_id: restaurant.id,
        operations: [
          {
            start_hour: '17:30',
            end_hour: '17:20',
            period_description: 'HAPPY HOUR',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a product with discount and invalid restaurant', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const updateProduct = new UpdateProductService(
      productsRepository,
      restaurantsRepositroy,
      operationsRepository,
      categoriesRepository,
    );

    const category = await categoriesRepository.create({ name: 'Dry food' });

    const restaurant = await restaurantsRepositroy.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const product = await productsRepository.create({
      name: 'Bread',
      category,
      price: 5.5,
      sale: false,
      restaurant,
    });

    expect(
      updateProduct.execute({
        id: product.id.toString(),
        name: 'Bread',
        category: 'Dry Food',
        price: 2.3,
        sale: false,
        restaurant_id: 5,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a product with discount and invalid product', async () => {
    const operationsRepository = new OperationsRepository();
    const productsRepository = new ProductsRepository();
    const restaurantsRepositroy = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const updateProduct = new UpdateProductService(
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
      updateProduct.execute({
        id: '3',
        name: 'Bread',
        category: 'Dry Food',
        price: 2.3,
        sale: false,
        restaurant_id: restaurant.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
