import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UploadRestaurantImageService from '../../services/UploadRestaurantImageService';

export default class UploadRestaurantImageController {
  public async upload(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const uploadRestaurantImage = container.resolve(
      UploadRestaurantImageService,
    );

    const idNumber = parseInt(id, 10);

    const restaurant = await uploadRestaurantImage.execute({
      id: idNumber,
      image: request.file.filename,
    });

    return response.json(classToClass(restaurant));
  }
}
