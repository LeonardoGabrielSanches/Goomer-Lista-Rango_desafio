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
    opening_hour,
    closing_hour,
    days,
    restaurant,
  }: ICreateOperationDTO): Promise<Operation> {
    const operation = this.ormRepository.create({
      opening_hour,
      closing_hour,
      days,
      restaurant,
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
