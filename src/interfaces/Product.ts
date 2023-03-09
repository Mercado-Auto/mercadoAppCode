import Reseller from './Reseller';
import Section from './Section';
import Tag from './Tag';

export default interface Product {
  id: string;
  name: string;
  tags?: Tag[];
  price: string;
  photos: string[];
  reseller: Reseller;
  description?: string;
  sections?: Section[];
  stock_quantity: number;
}
