import Restaurant from '../../restaurants/typeorm/entities/Restaurant';

interface ICreateOperationDTO {
  opening_hour: string;
  closing_hour: string;
  days: string;
  restaurant?: Restaurant;
}

export default ICreateOperationDTO;
