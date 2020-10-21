import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ProductsRepository from '../../typeorm/repositories/ProductsRepository';

import CreateProductService from '../../services/CreateProductService';
import UpdateProductService from '../../services/UpdateProductService';
import DeleteProductService from '../../services/DeleteProductService';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const idNumber = parseInt(id, 10);

    const productsRepository = container.resolve(ProductsRepository);

    const product = await productsRepository.getById(idNumber);

    if (!product) return response.status(204).send();

    return response.json(product);
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

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
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

    const updateProduct = container.resolve(UpdateProductService);

    const idNumber = parseInt(id, 10);

    const product = await updateProduct.execute({
      id: idNumber,
      name,
      price,
      category,
      sale,
      restaurant_id,
      sale_description,
      sale_price,
      operations,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductService);

    const idNumber = parseInt(id, 10);

    await deleteProduct.execute(idNumber);

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const productsRepository = container.resolve(ProductsRepository);

    const products = await productsRepository.getAll();

    if (products.length <= 0) return response.status(204).send();

    return response.json(products);
  }
}
