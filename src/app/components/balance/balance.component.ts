import { Component, Input } from '@angular/core';
import { Transaction } from '../../services/transaction.service';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  @Input()
  set transactions(value: Transaction[]) {
    this.balance$ = of(value).pipe(
      map(transactions =>
        transactions.reduce((acc, transaction) => {
          return transaction.type === 'income'
            ? acc + transaction.amount
            : acc - transaction.amount;
        }, 0)
      )
    );
  }
  balance$: Observable<number> = of(0);
}
