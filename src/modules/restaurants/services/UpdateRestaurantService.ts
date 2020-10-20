import { differenceInMinutes, isBefore } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

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
  opening_hour: string;
  closing_hour: string;
  days: string;
}

@injectable()
class UpdateRestaurantService {
  constructor(
    @inject('RestaurantsRepository')
    private restaurantsRepository: IRestaurantsRepository,
    @inject('OperationsRepository')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Restaurant> {
    const operationData: IRequestOperation[] = data.operations;

    const restaurant = await this.restaurantsRepository.getById(data.id);

    if (!restaurant) throw new Error('Restaurante não cadastrado');

    if (operationData.length <= 0)
      throw new Error('Deve haver um horário de funcionamento');

    operationData.forEach(operation => {
      const [openingHour, openingMinutes] = operation.opening_hour.split(':');
      const [closingHour, closingMinutes] = operation.closing_hour.split(':');

      const parsedOpeningHour = new Date().setHours(
        Number.parseInt(openingHour, 10),
        Number.parseInt(openingMinutes, 10),
      );

      const parsedClosingHour = new Date().setHours(
        Number.parseInt(closingHour, 10),
        Number.parseInt(closingMinutes, 10),
      );

      const dateValid = isBefore(parsedOpeningHour, parsedClosingHour);

      if (!dateValid) throw new Error('O intervalo de horário deve ser válido');

      const totalHoursOpen = differenceInMinutes(
        parsedClosingHour,
        parsedOpeningHour,
      );

      if (totalHoursOpen < 15)
        throw new Error(
          'O horário de funcionamento do estabelecimento deve ser de no minimo 15 minutos',
        );
    });

    operationData.forEach(async operation => {
      const operationDatabase = await this.operationsRepository.findById(
        operation.id,
      );

      if (operationDatabase) {
        operationDatabase.opening_hour = operation.opening_hour;
        operationDatabase.closing_hour = operation.closing_hour;
        operationDatabase.days = operation.days;

        this.operationsRepository.update(operationDatabase);
      }
    });

    restaurant.name = data.name;
    restaurant.address = data.address;

    await this.restaurantsRepository.update(restaurant);

    return restaurant;
  }
}

export default UpdateRestaurantService;
