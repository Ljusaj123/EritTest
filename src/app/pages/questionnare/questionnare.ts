import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Condition, Question, Section } from '@shared/models';
import { QuestionnareService } from '@core/questionnare.service';
import { QuestionItem } from 'src/app/components/question-item/question-item';

@Component({
  selector: 'app-questionnare',
  imports: [CommonModule, MatButtonModule, QuestionItem],
  templateUrl: './questionnare.html',
  styleUrl: './questionnare.scss',
})
export class Questionnare {
  public currentSectionIndex: number = 0;
  public currentQuestionIndex: number = 0;
  public history: { section: number; question: number }[] = [];
  public answersState = new Map<string, string | string[]>();

  public questionnareData: Section[] = [];

  constructor(private questionnareService: QuestionnareService) {
    this.questionnareData = this.questionnareService.getQuestionnare();
  }

  get currentQuestion() {
    return this.questionnareService.getCurrentQuestion(this.currentSectionIndex, this.currentQuestionIndex )
  }

  onAnswerChange(value: string | string[]) {
    this.answersState.set(this.currentQuestion.questionId, value);
  }

  goNext() {
    const answer = this.answersState.get(this.currentQuestion.questionId);
    if (!answer) return;

    const currentHistoryEntry = {
      section: this.currentSectionIndex,
      question: this.currentQuestionIndex,
    };

    const lastHistory = this.history[this.history.length - 1];
    if (
      !lastHistory ||
      lastHistory.section !== currentHistoryEntry.section ||
      lastHistory.question !== currentHistoryEntry.question
    ) {
      this.history.push(currentHistoryEntry);
    }
    const conditions = this.currentQuestion.conditions;

    if (!conditions || !conditions.length) {
      this.defaultNext();
      return;
    }

    const matchedConditions = conditions.filter((condition: Condition) =>
      Array.isArray(answer) ? answer.includes(condition.answerId) : condition.answerId === answer
    );

    if (matchedConditions.length === 1) {
      this.navigateByCondition(matchedConditions[0]);
    } else {
      this.defaultNext();
    }
  }

  defaultNext() {
    const currentSection = this.questionnareService.getCurrentSection(this.currentSectionIndex)

    if (this.currentQuestionIndex < currentSection.questions.length - 1) {
      this.currentQuestionIndex++;
    } else if (this.currentSectionIndex < this.questionnareData.length - 1) {
      this.currentSectionIndex++;
      this.currentQuestionIndex = 0;
    }
  }

  goBack() {
    const prev = this.history.pop();
    if (!prev) return;

    this.currentSectionIndex = prev.section;
    this.currentQuestionIndex = prev.question;
  }

  navigateByCondition(condition: Condition) {
    if (condition.type === 'section') {
      const sectionIndex = this.questionnareData.findIndex(
        (section) => section.sectionId === condition.target
      );

      if (sectionIndex != -1) {
        this.currentSectionIndex = sectionIndex;
        this.currentQuestionIndex = 0;
      }
    }

    if (condition.type === 'question') {
      const currentSection = this.questionnareService.getCurrentSection(this.currentSectionIndex);
      const questionIndex = currentSection.questions.findIndex(
        (question: Question) => question.questionId === condition.target
      );
      if (questionIndex != -1) {
        this.currentQuestionIndex = questionIndex;
      }
    }
  }
}
