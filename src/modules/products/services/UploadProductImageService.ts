import { inject, injectable } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../../../config/upload';

import IProductsRepository from '../repositories/IProductsRepository';

import Product from '../typeorm/entities/Product';

interface IRequest {
  id: number;
  image: string;
}

@injectable()
class UploadProductImageService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id, image }: IRequest): Promise<Product> {
    const product = await this.productsRepository.getById(id);

    if (!product) throw new Error('Produto não cadastrado');

    if (product.image) {
      const ProductImageFilePath = path.join(
        uploadConfig.directory,
        product.image,
      );

      const ProductImageAlreadyExists = await fs.promises.stat(
        ProductImageFilePath,
      );

      if (ProductImageAlreadyExists)
        await fs.promises.unlink(ProductImageFilePath);
    }

    product.image = image;

    await this.productsRepository.update(product);

    Object.assign(product, {
      image: product.image
        ? `http://localhost:3333/uploads/${product.image}`
        : null,
    });

    return product;
  }
}

export default UploadProductImageService;
