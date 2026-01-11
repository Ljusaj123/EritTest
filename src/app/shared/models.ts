export interface AnswerOption {
  id: number;
  label: string;
  isFlag?: boolean;
}

export interface Section {
  order: string;
  title: string;
  questions: Question[];
}

export interface Question {
  order: string;
  title: string;
  type: 'multiple' | 'single';
  points: number
  answers: AnswerOption[];
}
