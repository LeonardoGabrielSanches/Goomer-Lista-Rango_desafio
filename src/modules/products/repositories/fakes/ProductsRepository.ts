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

  public async getById(id: string): Promise<Product | undefined> {
    return this.products.find(product => product.id.toString() === id);
  }

  public async getAllByRestaurantId(restaurantId: string): Promise<Product[]> {
    return this.products.filter(
      product => product.restaurant.id.toString() === restaurantId,
    );
  }

  public async update(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      productFind => productFind.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  public async delete(id: string): Promise<void> {
    this.products = this.products.filter(
      product => product.id.toString() !== id,
    );
  }
}

export default ProductsRepository;
