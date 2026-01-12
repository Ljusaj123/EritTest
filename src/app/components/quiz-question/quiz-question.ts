import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MultipleAnswers } from '../multiple-answers/multiple-answers';
import { SingleAnswer } from '../single-answer/single-answer';
import { CommonModule } from '@angular/common';
import { Question } from '../../shared/models';

@Component({
  selector: 'app-quiz-question',
  imports: [MatCheckboxModule, MultipleAnswers, SingleAnswer, CommonModule],
  templateUrl: './quiz-question.html',
  styleUrl: './quiz-question.scss',
})
export class QuizQuestion {
  @Input() question!: Question;

  @Output() selected = new EventEmitter<any>();

  onAnswerChange(value: any) {
    this.selected.emit(value);
  }
}
