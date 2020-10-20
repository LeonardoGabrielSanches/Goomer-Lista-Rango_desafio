import { getRepository, Repository } from 'typeorm';

import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import ICategoriesRepository from '../../repositories/ICategoriesRepository';

import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findByName(name: string): Promise<Category | undefined> {
    return this.ormRepository.findOne({ where: { name } });
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({ name });

    await this.ormRepository.save(category);

    return category;
  }
}

export default CategoriesRepository;
