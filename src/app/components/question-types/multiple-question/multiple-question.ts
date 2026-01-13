import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-multiple-question',
  imports: [MatRadioModule, CommonModule],
  templateUrl: './multiple-question.html',
  styleUrl: './multiple-question.scss',
})
export class MultipleQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() isFlag: boolean = false;
  @Input() showFlag: boolean = true;
  @Output() selected = new EventEmitter<number>();
}
