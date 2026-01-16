import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption, MatSelectChange } from '@angular/material/select';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-dropdown-question',
  imports: [MatInputModule, MatSelect, MatOption, FormsModule],
  templateUrl: './dropdown-question.html',
  styleUrl: './dropdown-question.scss',
})
export class DropdownQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;
  @Output() selected = new EventEmitter<string>();

  public selectedValue: string | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['answers'] && !changes['answers'].firstChange) {
      this.selectedValue = null;
    }
  }

  onSelectionChange(event: MatSelectChange) {
    this.selectedValue = event.value;
    this.selected.emit(event.value);
  }
}
