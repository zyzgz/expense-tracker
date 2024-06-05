import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Transaction, TransactionService } from '../../services/transaction.service';
import { Category, CategoryService } from '../../services/category.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';

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
  ],
  providers: [DialogService],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  private _transactions: Transaction[] = [];

  @Input({ required: true })
  set transactions(value: Transaction[]) {
    this._transactions = value.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.filterTransactionsByCategory();
  }

  get transactions(): Transaction[] {
    return this._transactions;
  }

  private readonly dialogService = inject(DialogService);
  private readonly transactionService = inject(TransactionService);
  categoryService = inject(CategoryService);

  selectedCategory: Category | null = null;
  filteredTransactions: Transaction[] = this.transactions;

  filterTransactionsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredTransactions = this.transactions.filter(
        transaction => transaction.category.id === this.selectedCategory!.id
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
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
