import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Transaction } from '../transaction.service';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [AvatarModule, ButtonModule, CommonModule, MenuModule],
  templateUrl: './transaction-item.component.html',
  styleUrl: './transaction-item.component.scss',
})
export class TransactionItemComponent {
  @Input({ required: true })
  transaction!: Transaction;
  @Output() editTransaction = new EventEmitter<Transaction>();
  @Output() deleteTransaction = new EventEmitter<Transaction>();

  items: MenuItem[] = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
      command: () => {
        this.editTransaction.emit(this.transaction);
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
      command: () => {
        this.deleteTransaction.emit(this.transaction);
      },
    },
  ];
}
