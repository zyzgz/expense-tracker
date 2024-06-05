import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { Transaction } from '../../services/transaction.service';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CardModule, ChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnChanges {
  @Input({ required: true }) transactions!: Transaction[];
  isDataEmpty = true;
  data?: ChartData;

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['transactions']) return;

    const categories = this.transactions
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
  }
}
