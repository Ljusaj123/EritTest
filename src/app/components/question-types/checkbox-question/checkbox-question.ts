import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-checkbox-question',
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './checkbox-question.html',
  styleUrl: './checkbox-question.scss',
})
export class CheckboxQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() isFlag: boolean = false;
  @Input() showFlag: boolean = true;

  @Output() selected = new EventEmitter<string[]>();

  private selectedAnswers = new Set<string>();

  toggle(label: string) {
    this.selectedAnswers.has(label) ? this.selectedAnswers.delete(label) : this.selectedAnswers.add(label);

    this.selected.emit([...this.selectedAnswers]);
  }
}
