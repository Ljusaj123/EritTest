import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatFormField, MatHint } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AnswerOption } from '@shared/models';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-question',
  imports: [MatFormField, MatDatepickerModule, MatHint, MatInputModule, FormsModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './date-question.html',
  styleUrl: './date-question.scss',
})
export class DateQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<Date>();

  public selectedValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.selectedValue = null;
    }
  }

  onDateChange(event: any) {
    this.selectedValue = event.value;
    this.answered.emit(event.value);
  }
}
