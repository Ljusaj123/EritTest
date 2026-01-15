import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatOption, MatSelectChange } from '@angular/material/select';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-dropdown-question',
  imports: [MatInputModule, MatSelect, MatOption],
  templateUrl: './dropdown-question.html',
  styleUrl: './dropdown-question.scss',
})
export class DropdownQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;
  @Output() selected = new EventEmitter<string>();

onSelectChange(event: MatSelectChange) {
  this.selected.emit(event.value);
}
}
