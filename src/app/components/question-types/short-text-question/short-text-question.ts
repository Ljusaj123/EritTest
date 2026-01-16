import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-short-text-question',
  imports: [MatInputModule, FormsModule],
  templateUrl: './short-text-question.html',
  styleUrl: './short-text-question.scss',
})
export class ShortTextQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<string>();

  public enteredValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.enteredValue = '';
    }
  }

  onTextChange(event: Event) {
    this.enteredValue = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.answered.emit(this.enteredValue);
  }
}
