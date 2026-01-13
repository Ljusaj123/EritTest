import { Component, inject } from '@angular/core';
import { QuizSection } from '../../components/quiz-section/quiz-section';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateForm } from '../../components/create-form/create-form';
import { Router } from '@angular/router';
import { Section } from '@shared/models';
import { QuestionnareService } from '@core/questionnare.service';

@Component({
  selector: 'app-admin-page',
  imports: [QuizSection, CommonModule, MatIconModule, MatButtonModule, CreateForm],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private router = inject(Router);
  public questionnareData: Section[] = [];

  constructor(private questionnareService: QuestionnareService) {
    this.questionnareData = this.questionnareService.getQuestionnare();
  }

  startQuestionnaire() {
    this.router.navigateByUrl(`/questionnaire`);
  }
}
