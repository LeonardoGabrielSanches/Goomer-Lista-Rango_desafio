import ICreateProductDTO from '../dtos/ICreateProductDTO';

import Product from '../typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  getById(id: number): Promise<Product | undefined>;
  getAll(): Promise<Product[]>;
  update(product: Product): Promise<Product>;
  delete(id: number): Promise<void>;
}

export default IProductsRepository;
