import ICreateOperationDTO from '../../operations/dtos/ICreateOperationDTO';

interface ICreateRestaurantDTO {
  name: string;
  address: string;
  image: string;
  operations: ICreateOperationDTO[];
}

export default ICreateRestaurantDTO;
