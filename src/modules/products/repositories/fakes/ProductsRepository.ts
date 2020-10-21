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

  public async getById(id: number): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }

  public async getAll(): Promise<Product[]> {
    return this.products;
  }

  public async update(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      restaurantFind => restaurantFind.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async delete(id: number): Promise<void> {
    this.products = this.products.filter(product => product.id !== id);
  }
}

export default ProductsRepository;
