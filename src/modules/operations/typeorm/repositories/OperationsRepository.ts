import { getRepository, Repository } from 'typeorm';

import ICreateOperationDTO from '../../dtos/ICreateOperationDTO';
import IOperationsRepository from '../../repositories/IOperationsRepository';

import Operation from '../entities/Operation';

class OperationsRepository implements IOperationsRepository {
  private ormRepository: Repository<Operation>;

  constructor() {
    this.ormRepository = getRepository(Operation);
  }

  public async create({
    start_hour,
    end_hour,
    period_description,
    restaurant,
    product,
  }: ICreateOperationDTO): Promise<Operation> {
    const operation = this.ormRepository.create({
      start_hour,
      end_hour,
      period_description,
      restaurant,
      product,
    });

    await this.ormRepository.save(operation);

    return operation;
  }

  public async update(operation: Operation): Promise<Operation> {
    await this.ormRepository.save(operation);

    return operation;
  }

  public async findById(id: number): Promise<Operation | undefined> {
    return this.ormRepository.findOne({ id });
  }
}

export default OperationsRepository;
