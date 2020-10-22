import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ProductsRepository from '../../typeorm/repositories/ProductsRepository';

import CreateProductService from '../../services/CreateProductService';
import UpdateProductService from '../../services/UpdateProductService';
import DeleteProductService from '../../services/DeleteProductService';

export default class ProductController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productsRepository = container.resolve(ProductsRepository);

    const product = await productsRepository.getById(id);

    if (!product) return response.status(204).send();

    return response.json(classToClass(product));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      price,
      category,
      sale,
      restaurant_id,
      operations,
      sale_description,
      sale_price,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      category,
      sale,
      restaurant_id,
      operations,
      sale_description,
      sale_price,
    });

    return response.status(201).json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
      name,
      price,
      category,
      sale,
      restaurant_id,
      operations,
      sale_description,
      sale_price,
    } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      price,
      category,
      sale,
      restaurant_id,
      sale_description,
      sale_price,
      operations,
    });

    return response.json(classToClass(product));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute(id);

    return response.status(204).send();
  }

  public async showByRestaurant(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { restaurantId } = request.query;

    const productsRepository = container.resolve(ProductsRepository);

    const products = await productsRepository.getAllByRestaurantId(
      restaurantId,
    );
    console.log(products);
    if (products.length <= 0) return response.status(204).send();

    return response.json(classToClass(products));
  }
}
