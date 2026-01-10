export interface AnswerOption {
  id: string;
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
  answers: AnswerOption[];
}
