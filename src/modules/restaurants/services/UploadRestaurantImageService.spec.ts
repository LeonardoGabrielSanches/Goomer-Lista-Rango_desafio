import RestaurantRepository from '../repositories/fakes/RestaurantsRepository';
import UploadRestaurantImageService from './UploadRestaurantImageService';

describe('UploadRestaurantImageService', () => {
  it('should be able to upload a restaurant image', async () => {
    const restaurantsRepository = new RestaurantRepository();

    const restaurant = await restaurantsRepository.create({
      name: 'Number One Restaurant',
      address: '8th Ave 541',
    });

    const uploadRestaurantImage = new UploadRestaurantImageService(
      restaurantsRepository,
    );

    const updatedRestaurant = await uploadRestaurantImage.execute({
      id: restaurant.id,
      image: 'image.png',
    });

    expect(updatedRestaurant).toHaveProperty('image');
  });

  it('should be able to upload a image for non existing restaurant', async () => {
    const restaurantsRepository = new RestaurantRepository();

    const uploadRestaurantImage = new UploadRestaurantImageService(
      restaurantsRepository,
    );

    expect(
      uploadRestaurantImage.execute({
        id: 1,
        image: 'image.png',
      }),
    ).resolves.toBeInstanceOf(Error);
  });
});
