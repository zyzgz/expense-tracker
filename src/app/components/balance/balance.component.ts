import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TransactionService } from '../../transactions-module/transaction.service';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './balance.component.html',
})
export class BalanceComponent {
  private readonly transactionService = inject(TransactionService);

  balance$: Observable<number> = this.transactionService.getTransactions().pipe(
    map(transactions =>
      transactions
        .map(transaction =>
          transaction.type === 'income' ? transaction.amount : -transaction.amount
        )
        .reduce((acc, amount) => acc + amount, 0)
    ),
    startWith(0)
  );
}
