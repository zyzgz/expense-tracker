import { Category } from '../categories-module/category.interface';
import { TransactionType } from './transaction-type.enum';

export interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  type: TransactionType;
  category: Category;
}
