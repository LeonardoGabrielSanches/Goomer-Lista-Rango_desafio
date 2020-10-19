import Operation from '../../typeorm/entities/Operation';
import ICreateOperationDTO from '../../dtos/ICreateOperationDTO';

import IOperationsRepository from '../IOperationsRepository';

class OperationsRepository implements IOperationsRepository {
  private operations: Operation[] = [];

  private uniqueId = 1;

  public async create(data: ICreateOperationDTO): Promise<Operation> {
    const operation = new Operation();

    Object.assign(operation, { id: this.uniqueId }, data);

    this.operations.push(operation);

    return operation;
  }

  public async update(operation: Operation): Promise<Operation> {
    const findIndex = this.operations.findIndex(
      operationFind => operationFind.id === operation.id,
    );

    this.operations[findIndex] = operation;

    return operation;
  }

  public async findById(id: number): Promise<Operation | undefined> {
    return this.operations.find(operation => operation.id === id);
  }
}

export default OperationsRepository;
