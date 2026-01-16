import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { ElementHeaderDirective } from '@shared/element-header.directive';
import { CheckboxQuestion } from '../question-types/checkbox-question/checkbox-question';
import { MultipleQuestion } from '../question-types/multiple-question/multiple-question';
import { ShortTextQuestion } from '../question-types/short-text-question/short-text-question';
import { LongTextQuestion } from '../question-types/long-text-question/long-text-question';
import { DropdownQuestion } from '../question-types/dropdown-question/dropdown-question';
import { DateQuestion } from '../question-types/date-question/date-question';
import { DocumentQuestion } from '../question-types/document-question/document-question';
import { Question } from '@shared/models';

@Component({
  selector: 'app-question-item',
  imports: [
    MatCheckboxModule,
    CommonModule,
    ElementHeaderDirective,
    CheckboxQuestion,
    MultipleQuestion,
    ShortTextQuestion,
    LongTextQuestion,
    DropdownQuestion,
    DateQuestion,
    DocumentQuestion,
  ],
  templateUrl: './question-item.html',
  styleUrl: './question-item.scss',
})
export class QuestionItem {
  @Input() question!: Question;
  @Input() key!: string;

  @Output() selected = new EventEmitter<any>();
  @Input() showFlag: boolean = true;

  onAnswerChange(value: any) {
    this.selected.emit(value);
  }
}
