import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AnswerOption } from '../../shared/models';

@Component({
  selector: 'app-multiple-answers',
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './multiple-answers.html',
  styleUrl: './multiple-answers.scss',
})
export class MultipleAnswers {
  @Input() answers: AnswerOption[] = [];
  @Input() isFlag: boolean = false;
  @Input() showFlag: boolean = true;

  @Output() selected = new EventEmitter<number[]>();

  private selectedIds = new Set<number>();

  toggle(id: number) {
    this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id);

    this.selected.emit([...this.selectedIds]);
  }
}
