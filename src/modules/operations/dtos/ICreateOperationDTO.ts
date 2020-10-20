import Product from '../../products/typeorm/entities/Product';
import Restaurant from '../../restaurants/typeorm/entities/Restaurant';

interface ICreateOperationDTO {
  start_hour: string;
  end_hour: string;
  period_description: string;
  restaurant?: Restaurant;
  product?: Product;
}

export default ICreateOperationDTO;
