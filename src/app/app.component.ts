import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGConfig } from 'primeng/api';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { DialogService } from 'primeng/dynamicdialog';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BalanceComponent } from './components/balance/balance.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarComponent,
    TransactionsComponent,
    StatisticsComponent,
    BalanceComponent,
  ],
  providers: [DialogService],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly primengConfig = inject(PrimeNGConfig);

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
