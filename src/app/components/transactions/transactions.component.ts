import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, CategoryService } from '../../services/category.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Transaction, TransactionService } from './transaction.service';
import { BehaviorSubject, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CommonModule,
    TransactionItemComponent,
    DropdownModule,
    CommonModule,
    FormsModule,
    DataViewModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    ReactiveFormsModule,
  ],
  providers: [DialogService],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  private readonly dialogService = inject(DialogService);
  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);

  transactions$ = this.transactionService.getTransactions();
  categories = this.categoryService.getCategories();
  private _selectedCategory$ = new BehaviorSubject<Category | null>(null);
  selectedCategory: Category | null = null;
  searchTerm = new FormControl('');

  filteredTransactions$ = combineLatest([
    this.transactions$,
    this._selectedCategory$,
    this.searchTerm.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([transactions, selectedCategory, searchTerm]) => {
      return transactions
        .filter(transaction => !selectedCategory || transaction.category.id === selectedCategory.id)
        .filter(
          transaction =>
            !searchTerm || transaction.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    })
  );

  selectCategory(): void {
    this._selectedCategory$.next(this.selectedCategory);
  }

  private openTransactionForm(header: string, transaction?: Transaction): void {
    this.dialogService.open(TransactionFormComponent, {
      header,
      closeOnEscape: true,
      dismissableMask: true,
      closable: true,
      width: '400px',
      position: 'top',
      data: {
        transaction,
      },
    });
  }

  addTransaction(): void {
    this.openTransactionForm('Add Transaction');
  }

  editTransaction(transaction: Transaction): void {
    this.openTransactionForm('Edit Transaction', transaction);
  }

  removeTransaction(transaction: Transaction): void {
    this.transactionService.removeTransaction(transaction);
  }
}
