import { getRepository, Repository } from 'typeorm';

import ICreateProductDTO from '../../dtos/ICreateProductDTO';

import IProductsRepository from '../../repositories/IProductsRepository';

import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    sale,
    sale_description,
    sale_price,
    category,
    restaurant,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      price,
      sale,
      sale_description,
      sale_price,
      restaurant,
      category,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async getById(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['operations', 'category'],
    });
  }

  public async getAllByRestaurantId(): Promise<Product[]> {
    return this.ormRepository.find({
      relations: ['operations', 'category'],
    });
  }

  public async update(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default ProductsRepository;
