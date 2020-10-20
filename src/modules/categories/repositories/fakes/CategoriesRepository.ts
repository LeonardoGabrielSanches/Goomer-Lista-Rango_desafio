import ICreateCategoryDTO from '../../dtos/ICreateCategoryDTO';
import Category from '../../typeorm/entities/Category';
import ICategoriesRepository from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  private uniqueId = 1;

  public async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name);
  }

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: this.uniqueId++ }, data);

    this.categories.push(category);

    return category;
  }
}

export default CategoriesRepository;
