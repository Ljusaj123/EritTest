import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizQuestion } from '../../components/quiz-question/quiz-question';
import { Condition, Question, Section } from '@shared/models';
import { QuestionnareService } from '@core/questionnare.service';

@Component({
  selector: 'app-questionnare',
  imports: [CommonModule, MatButtonModule, QuizQuestion],
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
    return this.questionnareData[this.currentSectionIndex].questions[this.currentQuestionIndex];
  }

  onAnswerChange(value: string | string[]) {
    this.answersState.set(this.currentQuestion.questionId, value);
  }

  goNext() {
    const answer = this.answersState.get(this.currentQuestion.questionId);
    if (!answer) return;

    this.history.push({
      section: this.currentSectionIndex,
      question: this.currentQuestionIndex,
    });

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
    const currentSection = this.questionnareData[this.currentSectionIndex];

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
      const section = this.questionnareData[this.currentSectionIndex];
      const questionIndex = section.questions.findIndex(
        (question: Question) => question.questionId === condition.target
      );
      if (questionIndex != -1) {
        this.currentQuestionIndex = questionIndex;
      }
    }
  }
}
