import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ChartData } from 'chart.js';
import { TransactionService } from '../transactions/transaction.service';
import { Observable, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, ChartModule, CommonModule],
  templateUrl: './statistics.component.html',
})
export class StatisticsComponent {
  private readonly transactionService = inject(TransactionService);

  data$: Observable<ChartData> = this.transactionService.getTransactions().pipe(
    map(transactions => {
      const categories = transactions
        .filter(transaction => transaction.type !== 'income')
        .reduce((acc, transaction) => {
          const categoryName = transaction.category.name;
          acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
          return acc;
        }, {} as { [key: string]: number });

      return {
        labels: Object.keys(categories),
        datasets: [
          {
            data: Object.values(categories),
          },
        ],
      };
    }),
    startWith({
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    })
  );
}
