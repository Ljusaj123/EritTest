import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { AnswerOption } from '../../shared/models';

@Component({
  selector: 'app-single-answer',
  imports: [MatRadioModule, CommonModule],
  templateUrl: './single-answer.html',
  styleUrl: './single-answer.scss',
})
export class SingleAnswer {
  @Input() answers!: AnswerOption[];
  @Input() isFlag: boolean = false;
  @Input() points: number = 0;
}
