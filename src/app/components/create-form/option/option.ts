import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { QuestionType } from '@shared/models';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-option',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIcon
],
  templateUrl: './option.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './option.scss',
})
export class Option {
  @Input() type: QuestionType = '';
  @Input() formGroup!: FormGroup;

  hasOptions(type: QuestionType): boolean {
    return ['multiple', 'check-boxes', 'drop-down'].includes(type);
  }
}
