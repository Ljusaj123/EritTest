import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-multiple-question',
  imports: [MatRadioModule, CommonModule, FormsModule],
  templateUrl: './multiple-question.html',
  styleUrls: ['./multiple-question.scss'],
})
export class MultipleQuestion implements OnChanges {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;
  @Output() selected = new EventEmitter<string>();

  public selectedValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.selectedValue = null;
    }
  }

  onSelectionChange(value: string) {
    this.selectedValue = value;
    this.selected.emit(value);
  }
}
