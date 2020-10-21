import { injectable, inject } from 'tsyringe';

import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}

export default DeleteProductService;
