import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuizQuestion } from '../quiz-question/quiz-question';
import { CommonModule } from '@angular/common';
import { Section } from '../../shared/models';

@Component({
  selector: 'app-quiz-section',
  imports: [MatExpansionModule, QuizQuestion, CommonModule],
  templateUrl: './quiz-section.html',
  styleUrl: './quiz-section.scss',
})
export class QuizSection {
  @Input() section!: Section;
}
