import { Injectable } from '@angular/core';
import { Section } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class QuestionnareService {
  public questionnareData: Section[] = [
    {
      sectionId: 'S-001',
      label: 'Lacinia quis vel eros donec ac odio tempor orci',
      questions: [
        {
          questionId: 'Q-001',
          label: 'Lacinia quis vel eros donec ac odio tempor orci',
          type: 'checkboxes',
          answers: [
            { answerId: 1, label: 'Donec ac odio tempor orci' },
            { answerId: 2, label: 'Lacinia quis vel eros donec ac odio tempor orci' },
            { answerId: 3, label: 'Odio tempor orci' },
            { answerId: 4, label: 'Vel eros donec ac odio tempor orci', isFlag: true, points: 2 },
          ],
          conditions: [
            {
              answerId: 4,
              type: 'section',
              target: 'S-003',
            },
          ],
        },
        {
          questionId: 'Q-002',
          label: 'Donec ac odio tempor orci',
          type: 'multiple',
          answers: [
            { answerId: 1, label: 'Yes' },
            { answerId: 2, label: 'No', isFlag: true, points: 1 },
          ],
          conditions: [
            {
              answerId: 2,
              type: 'section',
              target: 'S-002',
            },
          ],
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
          answers: [
            { answerId: 1, label: 'Yes' },
            { answerId: 2, label: 'No', isFlag: true, points: 1 },
          ],
        },
      ],
    },
    {
      sectionId: 'S-003',
      label: 'Additional questions',
      questions: [
        {
          questionId: 'Q-001',
          label: 'Why did you choose No?',
          type: 'multiple',
          answers: [
            { answerId: 1, label: 'Donec ac odio tempor orci' },
            { answerId: 2, label: 'Lacinia quis vel eros donec ac odio tempor orci' },
            { answerId: 3, label: 'Odio tempor orci' },
            { answerId: 4, label: 'Vel eros donec ac odio tempor orci', isFlag: true, points: 3 },
          ],
        },
      ],
    },
  ];

  getQuestionnare() {
    return this.questionnareData;
  }

  getAllSectionOrders(): string[] {
    return this.questionnareData.map((section) => section.sectionId);
  }

  getQuestionOrdersBySection(sectionOrder: string): string[] {
    const section = this.questionnareData.find((section) => section.sectionId === sectionOrder);

    if (!section) {
      return [];
    }

    return section.questions.map((question) => question.questionId);
  }
}
