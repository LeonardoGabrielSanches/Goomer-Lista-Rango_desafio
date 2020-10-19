import ICreateOperationDTO from '../dtos/ICreateOperationDTO';
import Operation from '../typeorm/entities/Operation';

interface IOperationsRepository {
  create(data: ICreateOperationDTO): Promise<Operation>;
  update(operation: Operation): Promise<Operation>;
  findById(id: number): Promise<Operation | undefined>;
}

export default IOperationsRepository;
