import { Injectable } from '@angular/core';
import { Section } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class QuestionnareService {
  public questionnareData: Section[] = [
    {
      order: 'S-001',
      title: 'Lacinia quis vel eros donec ac odio tempor orci',
      questions: [
        {
          order: 'Q-001',
          title: 'Lacinia quis vel eros donec ac odio tempor orci',
          type: 'multiple',
          answers: [
            { id: 1, label: 'Donec ac odio tempor orci' },
            { id: 2, label: 'Lacinia quis vel eros donec ac odio tempor orci' },
            { id: 3, label: 'Odio tempor orci' },
            { id: 4, label: 'Vel eros donec ac odio tempor orci', isFlag: true, points: 2 },
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
          order: 'Q-002',
          title: 'Donec ac odio tempor orci',
          type: 'single',
          answers: [
            { id: 1, label: 'Yes' },
            { id: 2, label: 'No', isFlag: true, points: 1 },
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
      order: 'S-002',
      title: 'Tarcu non sodales neque sodales.',
      questions: [
        {
          order: 'Q-001',
          title: 'Lacinia quis vel eros donec ac odio tempor orci',
          type: 'single',
          answers: [
            { id: 1, label: 'Yes' },
            { id: 2, label: 'No', isFlag: true, points: 1 },
          ],
        },
      ],
    },
    {
      order: 'S-003',
      title: 'Additional questions',
      questions: [
        {
          order: 'Q-001',
          title: 'Why did you choose No?',
          type: 'multiple',
          answers: [
            { id: 1, label: 'Donec ac odio tempor orci' },
            { id: 2, label: 'Lacinia quis vel eros donec ac odio tempor orci' },
            { id: 3, label: 'Odio tempor orci' },
            { id: 4, label: 'Vel eros donec ac odio tempor orci', isFlag: true, points: 3 },
          ],
        },
      ],
    },
  ];

  getQuestionnare() {
    return this.questionnareData;
  }
}
