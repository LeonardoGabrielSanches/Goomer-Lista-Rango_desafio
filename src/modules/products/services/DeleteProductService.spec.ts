import ProductsRepository from '../repositories/fakes/ProductsRepository';
import RestaurantsRepository from '../../restaurants/repositories/fakes/RestaurantsRepository';
import CategoriesRepository from '../../categories/repositories/fakes/CategoriesRepository';

import DeleteProductService from './DeleteProductService';

describe('DeleteProductService', () => {
  it('should be able to delete a restaurant', async () => {
    const productsRepository = new ProductsRepository();
    const restaurantsRepository = new RestaurantsRepository();
    const categoriesRepository = new CategoriesRepository();

    const restaurant = await restaurantsRepository.create({
      name: 'Number one restaurant',
      address: '8th avenue',
    });

    const category = await categoriesRepository.create({ name: 'Dry food' });

    const product = await productsRepository.create({
      name: 'Bread',
      category,
      price: 5.5,
      sale: false,
      restaurant,
    });

    const deleteProductService = new DeleteProductService(productsRepository);

    expect(deleteProductService.execute(product.id)).resolves.not.toThrow();
  });
});
