import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadProductImageService from '../../services/UploadProductImageService';

export default class UploadRestaurantImageController {
  public async upload(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const uploadProductImageService = container.resolve(
      UploadProductImageService,
    );

    const idNumber = parseInt(id, 10);

    const product = await uploadProductImageService.execute({
      id: idNumber,
      image: request.file.filename,
    });

    return response.json(product);
  }
}
