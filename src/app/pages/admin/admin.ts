import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CreateAction, QuestionType, Section } from '@shared/models';
import { QuestionnareService } from '@core/questionnare.service';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ContextMenu } from 'src/app/components/context-menu/context-menu';
import { QuizQuestion } from 'src/app/components/quiz-question/quiz-question';
import { CreateForm } from 'src/app/components/create-form/create-form';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-admin-page',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CdkAccordionModule,
    ContextMenu,
    QuizQuestion,
    CreateForm,
    CdkMenuModule,
    MatExpansionModule
],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private router = inject(Router);
  public questionnareData: Section[] = [];

  public activeSectionId: string | null = null;
  public showCreateQuestionForm = false;
  public newQuestionId: string | null = null;

  public questionType: QuestionType = '';

  constructor(private questionnareService: QuestionnareService) {
    this.questionnareData = this.questionnareService.getQuestionnare();
  }

  startQuestionnaire() {
    this.questionnareService.removeEditingMode();
    this.router.navigateByUrl(`/questionnaire`);
  }

  setActiveSection(sectionId: string) {
    this.activeSectionId = sectionId;
  }

  handleAction(action: CreateAction) {
    if (!this.activeSectionId) return;
    if (action.type === 'section') {
      this.questionnareService.createSection();
    }
    this.questionType = action.questionType;

    if (action.type === 'question') {
      this.newQuestionId = this.questionnareService.createQuestion(
        action.questionType ?? 'check-boxes',
        this.activeSectionId
      );
      if (!this.newQuestionId) return;

      this.questionnareService.setActiveQuestion(this.activeSectionId, this.newQuestionId);
      this.showCreateQuestionForm = true;
    }
  }

  closeCreateForm() {
    this.showCreateQuestionForm = false;
  }
}
