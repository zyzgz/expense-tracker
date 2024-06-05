import { Component, OnInit, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { ChartData } from 'chart.js';
import { TransactionService } from '../transactions/transaction.service';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, ChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  private readonly transactionService = inject(TransactionService);

  isDataEmpty = true;
  data?: ChartData;

  ngOnInit(): void {
    this.initTransactions();
  }

  private initTransactions(): void {
    this.transactionService.getTransactions().subscribe(transactions => {
      const categories = transactions
        .filter(transaction => transaction.type !== 'income')
        .reduce((acc, transaction) => {
          const categoryName = transaction.category.name;
          acc[categoryName] = (acc[categoryName] || 0) + transaction.amount;
          return acc;
        }, {} as { [key: string]: number });

      if (Object.keys(categories).length === 0) {
        this.isDataEmpty = true;
      } else {
        this.isDataEmpty = false;
      }

      this.data = {
        labels: Object.keys(categories || {}),
        datasets: [
          {
            data: Object.values(categories || {}),
          },
        ],
      };
    });
  }
}
