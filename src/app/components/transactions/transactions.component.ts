import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { Category, CategoryService } from '../../services/category.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Transaction, TransactionService } from './transaction.service';

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
  ],
  providers: [DialogService],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  private readonly dialogService = inject(DialogService);
  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);

  transactions: Transaction[] = [];
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  filteredTransactions: Transaction[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.initCategories();
    this.initTransactions();
  }

  private initTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
      this.filterTransactionsByCategory();
    });
  }

  private initCategories(): void {
    this.categoryService.getCategories().subscribe(categories => (this.categories = categories));
  }

  filterTransactionsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredTransactions = this.transactions.filter(
        transaction => transaction.category.id === this.selectedCategory!.id
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
  }

  filterTransactionsBySearchTerm(): void {
    if (this.searchTerm) {
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.name.toLowerCase().includes(this.searchTerm.toLowerCase())
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
