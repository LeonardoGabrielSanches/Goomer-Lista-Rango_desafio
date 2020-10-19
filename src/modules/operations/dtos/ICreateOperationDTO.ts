import Restaurant from '../../restaurants/typeorm/entities/Restaurant';

interface ICreateOperationDTO {
  opening_hour: Date;
  closing_hour: Date;
  days: string;
  restaurant?: Restaurant;
}

export default ICreateOperationDTO;
