import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadRestaurantImageService from '../../services/UploadRestaurantImageService';

export default class UploadRestaurantImageController {
  public async upload(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const uploadRestaurantImage = container.resolve(
      UploadRestaurantImageService,
    );

    const restaurant = await uploadRestaurantImage.execute({
      id,
      image: request.file.filename,
    });

    return response.json(restaurant);
  }
}
