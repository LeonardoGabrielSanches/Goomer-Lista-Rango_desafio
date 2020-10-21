import Category from '../../categories/typeorm/entities/Category';
import Restaurant from '../../restaurants/typeorm/entities/Restaurant';

interface ICreateProductDTO {
  name: string;
  price: number;
  category: Category;
  sale: boolean;
  sale_description?: string;
  sale_price?: number;
  restaurant: Restaurant;
}

export default ICreateProductDTO;
