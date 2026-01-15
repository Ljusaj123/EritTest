import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AnswerOption } from '@shared/models';

@Component({
  selector: 'app-document-question',
  imports: [MatIcon],
  templateUrl: './document-question.html',
  styleUrl: './document-question.scss',
})
export class DocumentQuestion {
  @Input() answers: AnswerOption[] = [];
  @Input() showFlag: boolean = true;

  @Output() answered = new EventEmitter<File>();

  fileName: string | null = null;

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.fileName = file.name;

    this.answered.emit(file);
  }
}
