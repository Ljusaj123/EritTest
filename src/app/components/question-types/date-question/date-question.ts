import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormField, MatHint } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AnswerOption } from '@shared/models';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-question',
  imports: [MatFormField, MatDatepickerModule, MatHint, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-question.html',
  styleUrl: './date-question.scss',
})
export class DateQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<Date>();

  onDateChange(event: any) {
    this.answered.emit(event.value);
  }
}
