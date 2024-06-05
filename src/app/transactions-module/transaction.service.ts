import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from './transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _transactions$ = new BehaviorSubject<Transaction[]>([]);

  constructor() {
    this._transactions$.next(this.getTransactionsFromLocalStorage());
  }

  getTransactions(): Observable<Transaction[]> {
    return this._transactions$.asObservable();
  }

  addTransaction(transaction: Transaction): void {
    const currentTransactions = [...this._transactions$.value, transaction];
    this._transactions$.next(currentTransactions);
    this.saveTransactionsToLocalStorage(currentTransactions);
  }

  editTransaction(updatedTransaction: Transaction): void {
    const currentTransactions = this._transactions$.getValue();
    const index = currentTransactions.findIndex(
      transaction => transaction.id === updatedTransaction.id
    );

    if (index !== -1) {
      currentTransactions[index] = updatedTransaction;
      this._transactions$.next(currentTransactions);
      this.saveTransactionsToLocalStorage(currentTransactions);
    } else {
      console.error('Transaction not found');
    }
  }

  removeTransaction(transactionToDelete: Transaction): void {
    const currentTransactions = this._transactions$.getValue();
    const updatedTransactions = currentTransactions.filter(
      transaction => transaction.id !== transactionToDelete.id
    );

    this._transactions$.next(updatedTransactions);
    this.saveTransactionsToLocalStorage(updatedTransactions);
  }

  private getTransactionsFromLocalStorage(): Transaction[] {
    const transactions = localStorage.getItem('transactions');
    return transactions ? JSON.parse(transactions) : [];
  }

  private saveTransactionsToLocalStorage(transactions: Transaction[]): void {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
}
