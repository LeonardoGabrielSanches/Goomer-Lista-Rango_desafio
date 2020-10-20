import Category from '../../categories/typeorm/entities/Category';
import Restaurant from '../../restaurants/typeorm/entities/Restaurant';

interface ICreateProductDTO {
  name: string;
  price: number;
  category: Category;
  promotion: boolean;
  promotion_description?: string;
  promotion_price?: number;
  restaurant: Restaurant;
}

export default ICreateProductDTO;
