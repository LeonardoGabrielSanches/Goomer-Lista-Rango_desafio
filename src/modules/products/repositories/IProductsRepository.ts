import ICreateProductDTO from '../dtos/ICreateProductDTO';

import Product from '../typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  getById(id: string): Promise<Product | undefined>;
  getAllByRestaurantId(restaurantId: string): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}

export default IProductsRepository;
