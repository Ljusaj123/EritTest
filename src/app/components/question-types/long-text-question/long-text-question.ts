import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-long-text-question',
  imports: [MatInputModule],
  templateUrl: './long-text-question.html',
  styleUrl: './long-text-question.scss',
})
export class LongTextQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<string>();

  onTextChange(event: Event) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.answered.emit(value);
  }
}
