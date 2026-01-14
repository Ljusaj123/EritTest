import { Component, inject, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { QuizQuestion } from '../quiz-question/quiz-question';
import { CommonModule } from '@angular/common';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CreateAction, Section } from '@shared/models';
import { ContextMenu } from '../context-menu/context-menu';
import { QuestionnareService } from '@core/questionnare.service';
import { CreateForm } from '../create-form/create-form';

@Component({
  selector: 'app-quiz-section',
  imports: [
    MatExpansionModule,
    QuizQuestion,
    CommonModule,
    CdkMenuModule,
    MatIconModule,
    MatDividerModule,
    ContextMenu,
    CreateForm,
  ],
  templateUrl: './quiz-section.html',
  styleUrl: './quiz-section.scss',
})
export class QuizSection {
  @Input() section!: Section;
  public activeSectionId: string | null = null;
  public showCreateQuestionForm = false;
  public newQuestionId: string | null = null;

  private questionnareService = inject(QuestionnareService);

  setActiveSection(sectionId: string) {
    this.activeSectionId = sectionId;
  }

  handleAction(action: CreateAction) {
    if (!this.activeSectionId) return;
    if (action.type === 'section') {
      this.questionnareService.createSection();
    }

    if (action.type === 'question') {
      this.newQuestionId = this.questionnareService.createQuestion(
        action.questionType,
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
