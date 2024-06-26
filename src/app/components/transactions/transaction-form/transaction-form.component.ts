import { Component, OnInit, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CategoryService } from '../../../categories-module/category.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { v4 as uuidv4 } from 'uuid';
import { TransactionService } from '../../../transactions-module/transaction.service';
import { Category } from '../../../categories-module/category.interface';
import { TransactionType } from '../../../transactions-module/transaction-type.enum';
import { Transaction } from '../../../transactions-module/transaction.interface';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    SelectButtonModule,
    DropdownModule,
  ],
  templateUrl: './transaction-form.component.html',
})
export class TransactionFormComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly ref = inject(DynamicDialogRef);
  private readonly transactionService = inject(TransactionService);
  private readonly config = inject(DynamicDialogConfig);
  private readonly categoryService = inject(CategoryService);

  transactionForm = this.fb.group({
    type: [TransactionType.INCOME, Validators.required],
    name: ['', Validators.required],
    category: [{} as Category, Validators.required],
    amount: [0, Validators.required],
    date: ['', Validators.required],
  });
  transactionTypes = [
    { label: 'Income', value: TransactionType.INCOME },
    { label: 'Expense', value: TransactionType.EXPENSE },
  ];
  isEditForm = false;
  categories = this.categoryService.getCategories();

  ngOnInit(): void {
    this.isEditForm = !!this.config.data?.transaction;
    if (this.isEditForm) this.transactionForm.patchValue(this.config.data.transaction);
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) return;

    const { name, category, amount, date, type } = this.transactionForm.controls;
    const transaction: Transaction = {
      id: this.isEditForm ? this.config.data.transaction.id : uuidv4(),
      name: name.value,
      category: category.value,
      amount: amount.value,
      date: date.value,
      type: type.value,
    };

    this.isEditForm
      ? this.transactionService.editTransaction(transaction)
      : this.transactionService.addTransaction(transaction);

    this.ref.close();
  }
}
