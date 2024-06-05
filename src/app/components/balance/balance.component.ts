import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TransactionService } from '../transactions/transaction.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  private readonly transactionService = inject(TransactionService);

  balance = 0;

  constructor() {
    this.transactionService.getTransactions().subscribe(transactions => {
      this.balance = transactions
        .map(transaction => {
          return transaction.type === 'income' ? transaction.amount : -transaction.amount;
        })
        .reduce((acc, amount) => acc + amount, 0);
    });
  }
}
