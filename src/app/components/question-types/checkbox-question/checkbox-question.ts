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

  @Output() selected = new EventEmitter<number[]>();

  private selectedIds = new Set<number>();

  toggle(id: number) {
    this.selectedIds.has(id) ? this.selectedIds.delete(id) : this.selectedIds.add(id);

    this.selected.emit([...this.selectedIds]);
  }
}
