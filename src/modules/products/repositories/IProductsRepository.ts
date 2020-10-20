import ICreateProductDTO from '../dtos/ICreateProductDTO';

import Product from '../typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
}

export default IProductsRepository;
