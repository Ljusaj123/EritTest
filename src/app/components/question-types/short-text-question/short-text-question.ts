import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-short-text-question',
  imports: [MatInputModule],
  templateUrl: './short-text-question.html',
  styleUrl: './short-text-question.scss',
})
export class ShortTextQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<string>();

  onTextChange(event: Event) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;
    this.answered.emit(value);
  }
}
