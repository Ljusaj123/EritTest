import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { Question } from '@shared/models';
import { ElementHeaderDirective } from '@shared/element-header.directive';
import { CheckboxQuestion } from '../question-types/checkbox-question/checkbox-question';
import { MultipleQuestion } from '../question-types/multiple-question/multiple-question';

@Component({
  selector: 'app-quiz-question',
  imports: [
    MatCheckboxModule,
    CommonModule,
    ElementHeaderDirective,
    CheckboxQuestion,
    MultipleQuestion,
  ],
  templateUrl: './quiz-question.html',
  styleUrl: './quiz-question.scss',
})
export class QuizQuestion {
  @Input() question!: Question;

  @Output() selected = new EventEmitter<any>();
  @Input() showFlag: boolean = true;

  onAnswerChange(value: any) {
    this.selected.emit(value);
  }
}
