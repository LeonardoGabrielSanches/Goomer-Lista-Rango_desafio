import { inject, injectable } from 'tsyringe';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import validateDate from '../../utils/DateHelper';

import Restaurant from '../typeorm/entities/Restaurant';

interface IRequest {
  id: number;
  name: string;
  address: string;
  // eslint-disable-next-line no-use-before-define
  operations: IRequestOperation[];
}

interface IRequestOperation {
  id: number;
  start_hour: string;
  end_hour: string;
  period_description: string;
}

@injectable()
class UpdateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute({
    id,
    name,
    address,
    operations,
  }: IRequest): Promise<Restaurant> {
    const operationData: IRequestOperation[] = operations;

    const restaurant = await this.restaurantsRepository.getById(id);

    if (!restaurant) throw new Error('Restaurante não cadastrado');

    if (operationData.length <= 0)
      throw new Error('Deve haver um horário de funcionamento');

    operationData.forEach(operation => {
      validateDate(operation.start_hour, operation.end_hour);
    });

    operationData.forEach(async operation => {
      const operationDatabase = await this.operationsRepository.findById(
        operation.id,
      );

      if (operationDatabase) {
        operationDatabase.start_hour = operation.start_hour;
        operationDatabase.end_hour = operation.end_hour;
        operationDatabase.period_description = operation.period_description;

        this.operationsRepository.update(operationDatabase);
      }
    });

    restaurant.name = name;
    restaurant.address = address;

    await this.restaurantsRepository.update(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantService;
