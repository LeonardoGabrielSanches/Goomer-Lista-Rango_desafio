import ICreateProductDTO from '../../dtos/ICreateProductDTO';
import IProductsRepository from '../IProductsRepository';

import Product from '../../typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  private uniqueId = 1;

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: this.uniqueId++ }, data);

    this.products.push(product);

    return product;
  }
}

export default ProductsRepository;
