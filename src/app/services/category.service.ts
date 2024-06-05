import { Injectable } from '@angular/core';
import { PrimeIcons } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Category {
  id: string;
  name: string;
  icon: PrimeIcons;
}

const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Groceries',
    icon: PrimeIcons.SHOPPING_BAG,
  },
  {
    id: '2',
    name: 'Rent',
    icon: PrimeIcons.HOME,
  },
  {
    id: '3',
    name: 'Payment',
    icon: PrimeIcons.BRIEFCASE,
  },
  {
    id: '4',
    name: 'Entertainment',
    icon: PrimeIcons.STAR,
  },
];

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private _categories = CATEGORIES;

  getCategories(): Category[] {
    return this._categories;
  }
}
