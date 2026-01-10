import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AnswerOption } from '../../shared/models';

@Component({
  selector: 'app-multiple-answers',
  imports: [MatCheckboxModule, CommonModule],
  templateUrl: './multiple-answers.html',
  styleUrl: './multiple-answers.scss',
})
export class MultipleAnswers {
  @Input() answers!: AnswerOption[];
  @Input() points!: number;
  @Input() isFlag: boolean = false;
}
