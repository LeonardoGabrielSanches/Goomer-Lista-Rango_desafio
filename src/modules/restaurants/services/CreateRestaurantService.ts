import { inject, injectable } from 'tsyringe';
import { differenceInMinutes, isBefore } from 'date-fns';
import path from 'path';

import uploadConfig from '../../../config/upload';

import IOperationsRepository from '../../operations/repositories/IOperationsRepository';
import IRestaurantsRepository from '../repositories/IRestaurantsRepository';

import Restaurant from '../typeorm/entities/Restaurant';
import ICreateOperationDTO from '../../operations/dtos/ICreateOperationDTO';

interface IRequest {
  name: string;
  address: string;
  image: string;
  operations: ICreateOperationDTO[];
}

@injectable()
class CreateRestaurantService {
  constructor(
    @inject('Nome')
    private restaurantRepository: IRestaurantsRepository,
    @inject('Nome1')
    private operationsRepository: IOperationsRepository,
  ) {}

  public async execute(data: IRequest): Promise<Restaurant> {
    const operationData: ICreateOperationDTO[] = data.operations;

    if (operationData.length <= 0)
      throw new Error('Deve haver um horário de funcionamento');

    operationData.forEach(operation => {
      const dateValid = isBefore(
        operation.opening_hour,
        operation.closing_hour,
      );

      if (!dateValid) throw new Error('O intervalo de horário deve ser válido');

      const totalHoursOpen = differenceInMinutes(
        operation.closing_hour,
        operation.opening_hour,
      );

      if (totalHoursOpen < 15)
        throw new Error(
          'O horário de funcionamento do estabelecimento deve ser de no minimo 15 minutos',
        );
    });

    const restaurantFilePath = path.join(uploadConfig.directory, data.image);

    const restaurant = await this.restaurantRepository.create({
      name: data.name,
      address: data.address,
      image: restaurantFilePath,
      operations: data.operations,
    });

    operationData.forEach(async operation => {
      await this.operationsRepository.create({
        opening_hour: operation.opening_hour,
        closing_hour: operation.closing_hour,
        days: operation.days,
        restaurant,
      });
    });

    return restaurant;
  }
}

export default CreateRestaurantService;
