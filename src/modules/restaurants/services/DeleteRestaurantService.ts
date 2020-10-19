import { injectable, inject } from 'tsyringe';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

@injectable()
class DeleteRestaurantService {
  constructor(
    @inject('Nome1')
    private restaurantsRepository: IRestaurantsRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.restaurantsRepository.delete(id);
  }
}

export default DeleteRestaurantService;
