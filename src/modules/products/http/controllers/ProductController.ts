import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '../../services/CreateProductService';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      price,
      category,
      promotion,
      restaurant_id,
      operations,
      promotion_description,
      promotion_price,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      category,
      promotion,
      restaurant_id,
      operations,
      promotion_description,
      promotion_price,
    });

    return response.status(201).json(product);
  }
}
