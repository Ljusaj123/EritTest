import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-long-text-question',
  imports: [MatInputModule, FormsModule],
  templateUrl: './long-text-question.html',
  styleUrl: './long-text-question.scss',
})
export class LongTextQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<string>();

  public enteredValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.enteredValue = null;
    }
  }

  onTextChange(event: Event) {
    this.enteredValue = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.answered.emit(this.enteredValue);
  }
}
