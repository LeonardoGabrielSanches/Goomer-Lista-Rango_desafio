import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../../config/upload';

import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import Restaurant from '../typeorm/entities/Restaurant';

interface IRequest {
  id: number;
  image: string;
}

@injectable()
class UploadRestaurantImageService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute({ id, image }: IRequest): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.getById(id);

    if (!restaurant) throw new Error('Restaurante não cadastrado');

    if (restaurant.image) {
      const restaurantImageFilePath = path.join(
        uploadConfig.directory,
        restaurant.image,
      );

      const restaurantImageAlreadyExists = await fs.promises.stat(
        restaurantImageFilePath,
      );

      if (restaurantImageAlreadyExists)
        await fs.promises.unlink(restaurantImageFilePath);
    }

    restaurant.image = image;

    await this.restaurantsRepository.update(restaurant);

    return restaurant;
  }
}

export default UploadRestaurantImageService;
