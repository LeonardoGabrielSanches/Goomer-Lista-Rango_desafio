import ProductsRepository from '../repositories/fakes/ProductsRepository';
import CategoriesRepository from '../../categories/repositories/fakes/CategoriesRepository';
import RestaurantsRepository from '../../restaurants/repositories/fakes/RestaurantsRepository';

import UploadProductImageService from './UploadProductImageService';

describe('UploadRestaurantImageService', () => {
  it('should be able to upload a restaurant image', async () => {
    const productsRepository = new ProductsRepository();
    const categoriesRepository = new CategoriesRepository();
    const restaurantsRepository = new RestaurantsRepository();

    const restaurant = await restaurantsRepository.create({
      name: 'Number one restaurant',
      address: '8th avenue',
    });

    const category = await categoriesRepository.create({ name: 'Dry food' });

    const product = await productsRepository.create({
      name: 'Bread',
      category,
      price: 5.5,
      restaurant,
      sale: false,
    });

    const uploadRestaurantImage = new UploadProductImageService(
      productsRepository,
    );

    const updatedRestaurant = await uploadRestaurantImage.execute({
      id: product.id.toString(),
      image: 'image.png',
    });

    expect(updatedRestaurant).toHaveProperty('image');
  });

  it('should be able to upload a image for non existing product', async () => {
    const productsRepository = new ProductsRepository();

    const uploadProductImage = new UploadProductImageService(
      productsRepository,
    );

    expect(
      uploadProductImage.execute({
        id: '1',
        image: 'image.png',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
