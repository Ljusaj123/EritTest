import { Injectable } from '@angular/core';
import { Question, QuestionType, Section } from '@shared/models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnareService {
  private activeQuestionSubject = new BehaviorSubject<Question | null>(null);
  public activeQuestion$ = this.activeQuestionSubject.asObservable();

  public activeSection: string = '';

  public questionnareData: Section[] = [
    {
      sectionId: 'S-001',
      label: 'Lacinia quis vel eros donec ac odio tempor orci',
      questions: [
        {
          questionId: 'Q-001',
          label: 'Lacinia quis vel eros donec ac odio tempor orci',
          type: 'check-boxes',
          answers: [
            { label: 'Donec ac odio tempor orci' },
            { label: 'Lacinia quis vel eros donec ac odio tempor orci' },
            { label: 'Odio tempor orci' },
            { label: 'Vel eros donec ac odio tempor orci', isFlag: true, points: 2 },
          ],
        },
        {
          questionId: 'Q-002',
          label: 'Donec ac odio tempor orci',
          type: 'multiple',
          answers: [{ label: 'Yes' }, { label: 'No', isFlag: true, points: 1 }],
          conditions: [],
        },
      ],
    },
    {
      sectionId: 'S-002',
      label: 'Tarcu non sodales neque sodales.',
      questions: [
        {
          questionId: 'Q-001',
          label: 'Lacinia quis vel eros donec ac odio tempor orci',
          type: 'multiple',
          answers: [{ label: 'Yes' }, { label: 'No', isFlag: true, points: 1 }],
        },
      ],
    },
    {
      sectionId: 'S-003',
      label: 'Additional questions',
      questions: [
        {
          questionId: 'Q-001',
          label: 'Lacinia quis vel eros donec ac odio tempor orci',
          type: 'multiple',
          answers: [
            { label: 'Donec ac odio tempor orci' },
            { label: 'Lacinia quis vel eros donec ac odio tempor orci' },
            { label: 'Odio tempor orci' },
            { label: 'Vel eros donec ac odio tempor orci', isFlag: true, points: 3 },
          ],
        },
      ],
    },
  ];

  getQuestionnare() {
    return this.questionnareData;
  }

  getAllSectionIds(): string[] {
    return this.questionnareData.map((section) => section.sectionId);
  }

  getQuestionIdsBySection(sectionId: string): string[] {
    const section = this.questionnareData.find(
      (section: Section) => section.sectionId === sectionId
    );

    if (!section) {
      return [];
    }

    return section.questions.map((question: Question) => question.questionId);
  }

  createSection(): void {
    const lastSectionId = this.questionnareData[this.questionnareData.length - 1].sectionId;
    const section: Section = {
      sectionId: this.nextId(lastSectionId),
      label: 'New section',
      questions: [],
    };

    this.questionnareData.push(section);
  }

  createQuestion(type: QuestionType, activeSectionId: string): string | null {
    const section = this.questionnareData.find((section) => section.sectionId === activeSectionId);
    if (!section) return null;

    const lastQuestionId = section.questions[section.questions.length - 1]?.questionId;

    let nextQuestionId;

    if(!lastQuestionId) nextQuestionId = 'Q-001';
    else nextQuestionId = this.nextId(lastQuestionId);

    section.questions.push({
      questionId: nextQuestionId,
      label: 'Question',
      type,
      isEditing: true,
      answers: [
        {
          label: 'Option 1',
          isFlag: false,
        },
      ],
      conditions: [
        {
          answerId: '',
          type: null,
          target: '',
        },
      ],
    });

    return nextQuestionId;
  }

  removeEditingMode(): void {
    this.questionnareData.forEach((section) => {
      section.questions.forEach((question) => {
        delete question.isEditing;
      });
    });
  }

  setActiveQuestion(sectionId: string, questionId: string): void {
    const section = this.questionnareData.find(
      (section: Section) => section.sectionId === sectionId
    );
    this.activeSection = sectionId;
    if (!section) return;

    const question = section.questions.find(
      (question: Question) => question.questionId === questionId
    );
    if (!question) return;

    this.activeQuestionSubject.next(question);
  }

  updateActiveQuestion(patch: Partial<Question>): void {
    const current = this.activeQuestionSubject.value;
    if (!current) return;

    const updated = { ...current, ...patch };
    this.syncToStore(updated);
  }

  private syncToStore(updated: Question): void {
    const section = this.questionnareData.find(
      (section: Section) => section.sectionId === this.activeSection
    );
    if (!section) return;

    const index = section.questions.findIndex(
      (question: Question) => question.questionId === updated.questionId
    );

    if (index !== -1) {
      section.questions[index] = updated;
      return;
    }
  }

  private nextId(lastId: string): string {
    const [prefix, num] = lastId.split('-');

    const next = Number(num) + 1;

    return `${prefix}-${next.toString().padStart(num.length, '0')}`;
  }
}
