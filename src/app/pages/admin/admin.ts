import { Component } from '@angular/core';
import { QuizSection } from '../../components/quiz-section/quiz-section';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-page',
  imports: [QuizSection, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  public sections = [
    {
      order: 'S-001',
      title: 'Lacinia quis vel eros donec ac odio tempor orci',
      questions: [
        {
          order: 'Q-001',
          title: 'Lacinia quis vel eros donec ac odio tempor orci',
          type: 'multiple',
          points: 2,
          answers: [
            {
              id: 1,
              label: 'Donec ac odio tempor orci',
              isFlag: false,
            },
            {
              id: 2,
              label: 'Lacinia quis vel eros donec ac odio tempor orci',
              isFlag: false,
            },
            {
              id: 3,
              label: 'Odio tempor orci',
              isFlag: false,
            },
             {
              id: 4,
              label: 'Vel eros donec ac odio tempor orci',
              isFlag: true,
            },
          ],
        },
        {
          order: 'Q-002',
          title: 'Donec ac odio tempor orci',
          type: 'single',
          points: 1,
          answers: [
            {
              id: 1,
              label: 'Yes',
              isFlag: false,
            },
            {
              id: 2,
              label: 'No',
              isFlag: true,
            },
          ],
        },
      ],
    },
  ];
}
